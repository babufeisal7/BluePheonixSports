const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const sportsRoutes = require('./routes/sports'); // Updated to handle teams and players

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Blue Phoenix Sports Limited Admin Dashboard API');
});

// Use the sports routes
app.use('/api/sports', sportsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
