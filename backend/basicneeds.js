const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Load mock data from a JSON file
const listings = require('./data/listings.json');

// Simple endpoint to return the listings
app.get('/api/listings', (req, res) => {
    res.json(listings);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
