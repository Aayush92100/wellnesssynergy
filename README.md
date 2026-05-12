# Wellness Synergy

A modern AI-powered healthcare and wellness platform built to streamline doctor consultations, wellness tracking, and patient engagement through an intuitive digital experience.

## Live Demo

Frontend: [https://wellnesssynergy.vercel.app/](https://wellnesssynergy.vercel.app/)

---

# Features

* Modern responsive healthcare UI
* Google Authentication integration
* Doctor and patient interaction system
* Secure backend API integration
* File upload support
* MongoDB database integration
* Smooth animations with Framer Motion
* Fast frontend deployment using Vercel
* Backend deployment using Render
* Mobile-friendly responsive design



# Tech Stack

## Frontend

* React.js
* Vite
* Framer Motion
* CSS / Modern UI Components

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Google OAuth
* Multer

## Deployment

* Frontend: Vercel
* Backend: Render

---

# Project Structure

```bash
wellnesssynergy/
│
├── components/
├── public/
├── server/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── App.jsx
├── index.jsx
├── package.json
├── vite.config.ts
└── README.md
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/wellnesssynergy.git
cd wellnesssynergy
```

---

# Frontend Setup

Install frontend dependencies:

```bash
npm install
```

Run frontend locally:

```bash
npm run dev
```

---

# Backend Setup

Move into server folder:

```bash
cd server
```

Install backend dependencies:

```bash
npm install
```

Run backend server:

```bash
node server.js
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
MONGO_URI=your_mongodb_connection
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

---

# Google OAuth Setup

1. Open Google Cloud Console
2. Create OAuth 2.0 Client ID
3. Add Authorized JavaScript Origin:

```text
https://wellnesssynergy.vercel.app
```

4. Add Authorized Redirect URI:

```text
https://your-backend.onrender.com/auth/google/callback
```

5. Add test users in OAuth Consent Screen

---

# Deployment

## Frontend Deployment (Vercel)

```bash
npm run build
```

Deploy using:

* Vercel CLI
* GitHub Integration

---

## Backend Deployment (Render)

### Root Directory

```text
server
```

### Build Command

```bash
npm install
```

### Start Command

```bash
node server.js
```

---

# Future Improvements

* Appointment scheduling system
* AI-powered health recommendations
* Real-time chat system
* Video consultation support
* Payment gateway integration
* Admin dashboard analytics
* Email notifications

---

# Screenshots

Add screenshots of:

* Homepage
* Login page
* Dashboard
* Doctor consultation page
* Mobile responsive view

---

# Author

Developed by Aayush Tejani

---

# License

This project is created for educational and portfolio purposes.
