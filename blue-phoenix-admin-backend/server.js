const express = require('express');
const app = express();
const sportsRoutes = require('./routes/sports'); // Ensure this path is correct

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Blue Phoenix Sports Limited Admin Dashboard API');
});

// Use the sports routes
app.use('/api/sports', sportsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
