const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { execFile } = require('child_process');
const User = require('./models/User');
const fertilizerRoute = require('./fertilizer');
const contactRoute = require('./routes/Contact'); // ✅ Import contact route

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/agri-ai';

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this frontend (React app)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions)); // Use this configuration
app.use(express.json());

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🔐 Auth Routes
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid username' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, 'secretkey');
    res.json({ message: 'Login successful', token });
    console.log(user)
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }

});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    console.log(newUser)
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// 🌾 Crop Prediction Route
app.post('/predict/crop', (req, res) => {
  const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = req.body;

  const args = [nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall];

  console.log("📥 Calling Python script with args:", args);

  execFile('python3', ['predict_crop.py', ...args], (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error executing Python script:', error);
      return res.status(500).json({ error: 'Internal server error running prediction script' });
    }

    if (stderr) {
      console.error('⚠️ Python stderr:', stderr);
    }

    const prediction = stdout.trim();
    console.log("📤 Prediction:", prediction);

    res.json({ prediction });
  });
});

// 🧪 Fertilizer Recommendation Route
app.use("/recommend", fertilizerRoute);

// 📬 Contact Form Route (now saves to MongoDB)
app.use("/api", contactRoute); // ✅ Only call this once

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
