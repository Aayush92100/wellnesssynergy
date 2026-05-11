import React, { useState, useEffect } from 'react';

const Settings = ({ user }) => {
  const [isConnected, setIsConnected] = useState(user?.mobileDeviceConnected || false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (user?.mobileDeviceConnected !== undefined) {
      setIsConnected(user.mobileDeviceConnected);
    }
  }, [user]);

  const handleToggleConnection = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      if (!isConnected) {
        // Connecting flow: Direct to Google Fit without Bluetooth
        const userConfirmed = window.confirm(
          `Your fitness record is being requested by this site to be added to your account and shown in the health trends section.\n\nDo you give permission to fetch this data from Google Fit?`
        );

        if (userConfirmed) {
          // Tell backend we officially want to connect before authorizing
          const connectResponse = await fetch('http://localhost:5000/api/fitness/connect', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, connect: true }),
          });

          if (!connectResponse.ok) {
            alert("Failed to sync connection status with the server.");
            setIsUpdating(false);
            return;
          }

          const result = await connectResponse.json();

          if (result.hasGoogleTokens) {
            // Already authorized with Google Fit previously
            setIsConnected(true);
            if (user) {
              user.mobileDeviceConnected = true;
            }
            alert("Connection restored! We will pull your data directly from Google Fit.");
            setIsUpdating(false);
          } else {
            // Redirect to Google OAuth for fitness data
            const response = await fetch('http://localhost:5000/api/auth/google/url');
            if (response.ok) {
              const data = await response.json();
              if (data.url) {
                window.location.href = data.url;
              } else {
                alert('Failed to get Google Auth URL.');
                setIsUpdating(false);
              }
            } else {
              alert('Failed to connect to authentication server.');
              setIsUpdating(false);
            }
          }
        } else {
          setIsUpdating(false);
        }
      } else {
        // Disconnecting flow
        const response = await fetch('http://localhost:5000/api/fitness/connect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, connect: false }),
        });
        const data = await response.json();
        if (response.ok) {
          setIsConnected(false);
          if (user) {
            user.mobileDeviceConnected = false;
          }
        }
        setIsUpdating(false);
      }
    } catch (error) {
      console.error('Failed to toggle connection', error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-12 max-w-2xl">
      <header className="space-y-2">
        <h1 className="text-4xl font-black tracking-tight">Settings</h1>
        <p className="text-lg text-slate-400 font-medium">Manage your profile and device connections.</p>
      </header>

      <div className="space-y-6">
        <section className="glass p-8 rounded-[2.5rem] space-y-6">
          <h3 className="font-black text-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">person</span>
            Profile Information
          </h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Full Name</label>
              <input type="text" defaultValue={user?.name || ''} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-200" disabled />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500">Email Address</label>
              <input type="email" defaultValue={user?.email || ''} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors text-slate-200" disabled />
            </div>
          </div>
        </section>

        <section className="glass p-8 rounded-[2.5rem] space-y-6">
          <h3 className="font-black text-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">watch</span>
            Fitness Integration
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">api</span>
                </div>
                <div>
                  <p className="font-bold">Google Fit Account</p>
                  <p className="text-xs text-slate-500 font-medium">
                    {isConnected ? 'Connected • Collecting step & distance data' : 'Not Connected'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleToggleConnection}
                disabled={isUpdating}
                className={`text-xs font-black uppercase tracking-widest hover:underline ${isConnected ? 'text-rose-500' : 'text-primary'}`}
              >
                {isUpdating ? 'Updating...' : isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
