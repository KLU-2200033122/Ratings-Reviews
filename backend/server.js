const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express(); // ✅ app initialized before use

app.use(cors());
app.use(express.json());

// ✅ Serve frontend (e.g., index.html) statically
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ Mount routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api', reviewRoutes);

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://charitha:yourpassword123@cluster0.phyadiz.mongodb.net/ratingsDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Start Server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
