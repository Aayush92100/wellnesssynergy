# Render Deployment Guide - Wellness Synergy Server

## Prerequisites
- Render.com account
- MongoDB Atlas account (for database)
- GitHub repository with your code

## Step-by-Step Deployment

### 1. **Set Up MongoDB on Render/Atlas**
   - Create a MongoDB Atlas cluster
   - Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/wellnesssynergy?retryWrites=true&w=majority`

### 2. **Connect GitHub Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your code

### 3. **Configure Web Service on Render**
   
   **Basic Settings:**
   - **Name:** `wellnesssynergy-server`
   - **Environment:** `Node`
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Plan:** Free (or paid for production)

### 4. **Set Environment Variables**
   Add these in the "Environment" section on Render:

   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellnesssynergy?retryWrites=true&w=majority
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=https://your-render-url.onrender.com/api/auth/google/callback
   JWT_SECRET=your_secure_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

### 5. **Update Frontend CORS Settings**
   Update your frontend API calls to use:
   ```
   https://your-render-url.onrender.com/api/...
   ```

### 6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy whenever you push to main branch

## Environment Variables Explanation

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GOOGLE_REDIRECT_URI` | Render URL + `/api/auth/google/callback` |
| `JWT_SECRET` | Any long random string for JWT signing |
| `EMAIL_USER` | Gmail for password reset emails |
| `EMAIL_PASSWORD` | Gmail app password (not regular password) |

## Troubleshooting

**Build Fails:**
- Check if `server/package.json` exists
- Verify all dependencies are listed

**Server Won't Start:**
- Check logs in Render dashboard
- Ensure `MONGODB_URI` is correct
- Make sure environment variables are set

**Port Issues:**
- Render automatically assigns PORT via environment variable
- Your code correctly reads: `const PORT = process.env.PORT || 5000`

**Database Connection Error:**
- Verify MongoDB connection string
- Whitelist Render IP in MongoDB Atlas (or allow all: 0.0.0.0/0)

## Useful Links
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Google OAuth Setup](https://cloud.google.com/docs/authentication/oauth2)
