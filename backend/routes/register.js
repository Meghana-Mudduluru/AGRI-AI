app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    console.log("📩 Received register request:", username);
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log("⚠️ User already exists");
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      console.log("🛠️ New user object:", newUser);
  
      await newUser.save();
      console.log("✅ User saved to MongoDB");
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      console.error("❌ Error registering user:", err);
      res.status(500).json({ error: 'Error registering user' });
    }
  });
  