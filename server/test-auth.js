async function testAuth() {
    const email = `testuser_${Date.now()}@example.com`;
    const password = "password123";
    const name = "Test User";

    try {
        console.log("Registering...");
        const regRes = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name })
        });
        const regData = await regRes.json();
        console.log("Register Response:", regRes.status, regData);

        console.log("Logging in...");
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        console.log("Login Response:", loginRes.status, loginData);

    } catch (err) {
        console.error("Error:", err.message);
    }
}

testAuth();
