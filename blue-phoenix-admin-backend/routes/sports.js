const express = require('express');
const router = express.Router();

// Mock data for sports programs
const sports = [
    { id: 1, name: 'Rugby', status: 'active' },
    { id: 2, name: 'Football', status: 'active' },
    { id: 3, name: 'Basketball', status: 'coming soon' },
];

// Get all sports programs
router.get('/', (req, res) => {
    res.json(sports);
});

// Add a new sports program
router.post('/', (req, res) => {
    const newSport = req.body;
    sports.push(newSport);
    res.status(201).json(newSport);
});

module.exports = router;
