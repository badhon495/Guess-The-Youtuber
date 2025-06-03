const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const serverless = require('serverless-http');

// Load environment variables from .env file if it exists
try {
    require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
} catch (err) {
    // dotenv is optional, environment variables can be set directly
    console.log('dotenv not available, using direct environment variables');
}

const app = express();
app.use(cors({ origin: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        youtube_api_key: process.env.YOUTUBE_API_KEY ? 'Configured' : 'Missing'
    });
});

// Load channel names from the file
const channelNamesPath = path.join(__dirname, '../channel_names.txt');
const channelNames = fs.readFileSync(channelNamesPath, 'utf-8').split('\n');

app.get('/api/get-video', async (req, res) => {
    const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)].trim();
    const API_KEY = process.env.YOUTUBE_API_KEY;
    
    console.log(`Searching for channel: ${randomChannelName}`);
    console.log(`API Key present: ${API_KEY ? 'Yes' : 'No'}`);
    
    if (!API_KEY) {
        return res.status(500).json({
            error: 'YouTube API key not configured',
            details: 'Please set YOUTUBE_API_KEY in environment variables'
        });
    }
    
    try {
        const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: randomChannelName,
                type: 'channel',
                key: API_KEY,
            }
        });

        if (!searchResponse.data.items || searchResponse.data.items.length === 0) {
            throw new Error(`No channels found for: ${randomChannelName}`);
        }

        const channelId = searchResponse.data.items[0].id.channelId;

        const videoResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 1,
                key: API_KEY,
                order: 'date'
            }
        });

        if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
            throw new Error(`No videos found for channel: ${randomChannelName}`);
        }

        const videoData = videoResponse.data.items[0].snippet;
        res.json({
            thumbnail: videoData.thumbnails.high.url,
            channelTitle: videoData.channelTitle
        });
    } catch (error) {
        console.error('API Error:', error.message);
        console.error('Full error:', error.response?.data || error);
        
        // Return proper error response for quota exceeded
        if (error.response && error.response.status === 403) {
            return res.status(403).json({
                error: 'YouTube API quota exceeded',
                message: 'Daily quota limit has been reached. Please try again tomorrow.',
                details: error.response.data
            });
        }
        
        res.status(500).json({
            error: 'Server Error',
            details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
        });
    }
});

// For local development
const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
        console.log(`API endpoint available at http://localhost:${PORT}/api/get-video`);
    });
}

module.exports = app;
module.exports.handler = serverless(app);
