# Google OAuth + Render Deployment Setup Guide

## Step 1: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Find your OAuth 2.0 credentials
3. Add these **Authorized redirect URIs**:
   - `https://your-render-url.onrender.com/api/auth/google/callback` (backend)
   - `https://your-vercel-url.vercel.app` (frontend - for local testing)

## Step 2: Configure Render Environment Variables

Set these in Render dashboard:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://your-render-url.onrender.com/api/auth/google/callback
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellnesssynergy
JWT_SECRET=your_secure_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
NODE_ENV=production
```

## Step 3: Configure Vercel Environment Variables

Set these in Vercel dashboard (Project Settings > Environment Variables):

```
VITE_API_URL=https://your-render-url.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## Step 4: Local Development

Update your `.env.local`:

```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## How Google Login Flow Works

1. **User clicks "Continue with Google"** on frontend (Vercel)
2. **Frontend calls backend** → `/api/auth/google/url` 
3. **Backend returns Google OAuth URL** with redirect URI pointing to backend
4. **User authorizes on Google**
5. **Google redirects to** `your-render-url.onrender.com/api/auth/google/callback`
6. **Backend processes OAuth** and redirects to frontend with user data

## Important Notes

- ✅ Client ID needed in frontend (for UI)
- ✅ Client Secret needed only in backend (Render)
- ✅ Redirect URI must match exactly in Google Console
- ✅ CORS enabled on backend for frontend domain
