const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Chat API route
app.post('/api/chat', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Missing prompt information' });
        }

        // Directly use the API key from the system environment variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: 'API key is not configured, please set the GEMINI_API_KEY environment variable' });
        }

        console.log("Using API request URL:", `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=[Hidden]`);

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // Check the response
        if (response.data.error) {
            return res.status(500).json({ error: response.data.error.message });
        }

        if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
            const botResponse = response.data.candidates[0].content.parts[0].text;
            return res.json({ response: botResponse });
        } else {
            return res.status(500).json({ error: 'Unable to get a valid response' });
        }

    } catch (error) {
        console.error('API call error:', error.response ? error.response.data : error.message);
        return res.status(500).json({
            error: error.response && error.response.data.error
                ? error.response.data.error.message
                : 'Server Error'
        });
    }
});

// Main page route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`API key status: ${process.env.GEMINI_API_KEY ? 'set' : 'not set'}`);
});
