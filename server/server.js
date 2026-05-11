require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 5000;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/* -------------------- Middleware -------------------- */
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* -------------------- Ensure uploads folder -------------------- */
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* -------------------- Multer config -------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'avatar-' + unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

/* -------------------- MongoDB -------------------- */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

/* -------------------- User Schema -------------------- */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // optional now because of Google Auth
  name: String,
  profileImage: String,
  mobileDeviceConnected: { type: Boolean, default: false }, // acts as the Google Fit flag
  googleId: String,
  googleTokens: Object, // securely store access/refresh tokens
  joinedDate: { type: Date, default: Date.now },

  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model('User', userSchema);

/* -------------------- Fitness Data Schema -------------------- */
const fitnessDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  date: { type: Date, required: true },
  steps: { type: Number, default: 0 },
  distanceKm: { type: Number, default: 0 }
});

const FitnessData = mongoose.model('FitnessData', fitnessDataSchema);

/* -------------------- REGISTER -------------------- */
app.post('/api/auth/register', async (req, res) => {
  try {
    let { email, password, name } = req.body;
    email = email.toLowerCase().trim(); // Enforce lowercase emails

    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        mobileDeviceConnected: user.mobileDeviceConnected
      },
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- LOGIN -------------------- */
app.post('/api/auth/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim(); // Enforce lowercase emails

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the stored password is a plaintext password (not hashed by bcrypt)
    let isMatch = false;
    if (!user.password.startsWith('$2')) {
      // Plain text check (from accounts created before bcrypt was added)
      if (user.password === password) {
        isMatch = true;
        // Optional: auto-migrate to hashed password
        user.password = await bcrypt.hash(password, 12);
        await user.save();
      }
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profileImage: user.profileImage,
        mobileDeviceConnected: user.mobileDeviceConnected
      },
    });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- FORGOT PASSWORD -------------------- */
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'If email exists, reset link sent' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `
        <p>Click the link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: 'Reset link sent' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- RESET PASSWORD -------------------- */
app.post('/api/auth/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired link' });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- UPLOAD AVATAR -------------------- */
app.post('/api/user/upload-avatar', upload.single('avatar'), async (req, res) => {
  try {
    const { email } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    const user = await User.findOneAndUpdate(
      { email },
      { profileImage: imageUrl },
      { new: true }
    );

    if (!user) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Avatar uploaded', imageUrl });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- CONNECT MOBILE DEVICE -------------------- */
app.post('/api/fitness/connect', async (req, res) => {
  try {
    const { email, connect } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOneAndUpdate(
      { email },
      { mobileDeviceConnected: connect },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    // If connecting, generate mock 30-day data if none exists
    if (connect) {
      const existingData = await FitnessData.findOne({ email });
      if (!existingData) {
        const mockData = [];
        const today = new Date();
        for (let i = 29; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          // Generate somewhat realistic trends: 4000 to 12000 steps
          const steps = Math.floor(Math.random() * 8000) + 4000;
          const distanceKm = +(steps * 0.000762).toFixed(2); // rough conversion
          mockData.push({
            email,
            date: d,
            steps,
            distanceKm
          });
        }
        await FitnessData.insertMany(mockData);
      }
    }

    res.json({
      message: 'Device connection updated',
      user,
      hasGoogleTokens: !!user.googleTokens
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- GET FITNESS TRENDS -------------------- */
app.get('/api/fitness/trends', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // If they have Google Tokens and are connected, pull real Google Fit data!
    if (user.mobileDeviceConnected && user.googleTokens) {
      oauth2Client.setCredentials(user.googleTokens);
      const fitness = google.fitness({ version: 'v1', auth: oauth2Client });

      const now = new Date();
      // Align to start of today (midnight local time)
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(startOfToday.getDate() - 29); // encompass exactly 30 days including today

      // Fetch up to the literal start of tomorrow to cover all of today
      const endOfToday = new Date(startOfToday);
      endOfToday.setDate(startOfToday.getDate() + 1);

      // We use the aggregated dataset endpoint to get steps per day
      console.log(`Fetching Google Fit data for ${email}...`);
      const response = await fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [
            { dataTypeName: 'com.google.step_count.delta' },
            { dataTypeName: 'com.google.distance.delta' },
            { dataTypeName: 'com.google.calories.expended' }
          ],
          bucketByTime: { durationMillis: 86400000 }, // 1 day in ms
          startTimeMillis: thirtyDaysAgo.getTime(),
          endTimeMillis: endOfToday.getTime()
        }
      });
      console.log(`Google API Response buckets count:`, response?.data?.bucket?.length);

      const realData = [];
      response.data.bucket.forEach(bucket => {
        let steps = 0;
        let distanceKm = 0;
        let calories = 0;

        // Extract step count
        const stepDataset = bucket.dataset.find(d => d.dataSourceId.includes('step_count'));
        if (stepDataset && stepDataset.point && stepDataset.point.length > 0) {
          steps = stepDataset.point[0].value[0].intVal;
        }

        // Extract distance
        const distanceDataset = bucket.dataset.find(d => d.dataSourceId.includes('distance'));
        if (distanceDataset && distanceDataset.point && distanceDataset.point.length > 0) {
          distanceKm = +(distanceDataset.point[0].value[0].fpVal / 1000).toFixed(2);
        }

        // Extract calories
        const caloriesDataset = bucket.dataset.find(d => d.dataSourceId.includes('calories.expended'));
        if (caloriesDataset && caloriesDataset.point && caloriesDataset.point.length > 0) {
          calories = +(caloriesDataset.point[0].value[0].fpVal).toFixed(0);
        }

        realData.push({
          date: new Date(parseInt(bucket.startTimeMillis)),
          steps: steps || 0,
          distanceKm: distanceKm || 0,
          calories: calories || 0
        });
      });

      console.log(`Returning ${realData.length} days of data`);
      return res.json({ data: realData });
    }

    console.log(`No tokens found for ${email}, returning mock data...`);
    // Fallback: If no real data, fetch the generated DB mock data
    const data = await FitnessData.find({ email }).sort({ date: 1 });
    res.json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* -------------------- GOOGLE OAUTH ROUTES -------------------- */
app.get('/api/auth/google/url', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // gets refresh token
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.location.read'
    ],
    prompt: 'consent' // ensures refresh token every time
  });
  res.json({ url });
});

app.get('/api/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();

    // Check if user exists
    let user = await User.findOne({ email: userInfo.data.email });

    if (!user) {
      // Create new user securely (no password because it's Google Auth)
      user = new User({
        email: userInfo.data.email,
        name: userInfo.data.name,
        profileImage: userInfo.data.picture,
        googleId: userInfo.data.id,
        googleTokens: tokens
        // We do NOT set mobileDeviceConnected: true here anymore.
        // That is reserved for the explicit Bluetooth connect flow.
      });
    } else {
      // Update existing user with Google details and tokens
      user.googleId = userInfo.data.id;
      user.googleTokens = tokens;

      // If they are returning from the explicit Connect flow, the frontend
      // should hit /api/fitness/connect separately, or we infer it.
      // For now, we leave mobileDeviceConnected as whatever it was before.

      if (!user.profileImage) user.profileImage = userInfo.data.picture;
    }
    await user.save();

    // The react frontend runs on 3000 locally now or 5173 depending on dev environment. Use a flexible redirect in practice.
    // For now we redirect to front-end dashboard with tokens in url (or better set a cookie, but this is simplest test)
    // To make it fully seamless:
    const dataObj = encodeURIComponent(JSON.stringify({
      id: user._id,
      email: user.email,
      name: user.name,
      profileImage: user.profileImage,
      mobileDeviceConnected: user.mobileDeviceConnected
    }));

    // Depending on what ports the frontend uses:
    res.redirect(`http://localhost:5173/oauth/success?data=${dataObj}`);
  } catch (err) {
    console.error("OAuth Error:", err);
    res.status(500).send('Authentication failed');
  }
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});