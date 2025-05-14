const express = require('express');
const multer = require('multer');
const path = require('path');
const { execFile } = require('child_process');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/predict-disease', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  execFile('python3', ['predict_disease.py', imagePath], (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: stderr });
    res.json({ prediction: stdout.trim() });
  });
});

module.exports = router;
