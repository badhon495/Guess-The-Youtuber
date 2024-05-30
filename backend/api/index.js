const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const serverless = require('serverless-http');

const app = express();
app.use(cors({ origin: true }));

// Load channel names from the file
const channelNamesPath = path.join(__dirname, '..', 'channel_names.txt');
const channelNames = fs.readFileSync(channelNamesPath, 'utf-8').split('\n');

app.get('/api/get-video', async (req, res) => {
    const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)].trim();
    const API_KEY = process.env.YOUTUBE_API_KEY;
    try {
        const searchResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: randomChannelName,
                type: 'channel',
                key: API_KEY,
            }
        });

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

        const videoData = videoResponse.data.items[0].snippet;
        res.json({
            thumbnail: videoData.thumbnails.high.url,
            channelTitle: videoData.channelTitle
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = app;
module.exports.handler = serverless(app);
