require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Import the Vercel handler
const adviceHandler = require('./api/advice');

// Route for local API
app.post('/api/advice', (req, res) => {
  adviceHandler(req, res);
});

app.listen(PORT, () => {
  console.log(`Local API server running at http://localhost:${PORT}/api/advice`);
}); 