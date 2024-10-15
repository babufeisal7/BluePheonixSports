const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sportsRoutes = require('./routes/sports');

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bluePhoenixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection event
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Sample Event Schema
const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  imageUrl: String,
  description: String,
  category: String,
});

const Event = mongoose.model('Event', eventSchema);

// API routes
app.get('/', (req, res) => {
  res.send('Welcome to Blue Phoenix Sports Limited Admin Dashboard API');
});

// Route to get all events
app.get('/api/sports/events', async (req, res) => {
  try {
    const events = await Event.find(); // Fetch all events from MongoDB
    res.json(events); // Send events as JSON response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Use the sports routes
app.use('/api/sports', sportsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
