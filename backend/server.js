const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const API_KEY = process.env.YOUTUBE_API_KEY;

app.get('/api/get-video', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'channel_names.txt');
        const channelNames = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);

        const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)];

        const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                q: randomChannelName,
                type: 'channel',
                key: API_KEY
            }
        });

        if (!channelResponse.data.items.length) {
            throw new Error('No channel found');
        }

        const channelId = channelResponse.data.items[0].id.channelId;

        const channelDetailsResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
            params: {
                part: 'statistics',
                id: channelId,
                key: API_KEY
            }
        });

        const channelStatistics = channelDetailsResponse.data.items[0].statistics;
        const subscriberCount = parseInt(channelStatistics.subscriberCount);

        if (subscriberCount < 10000000) {
            throw new Error('Channel does not meet subscriber count requirement');
        }

        const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                channelId: channelId,
                maxResults: 1,
                order: 'date',
                key: API_KEY
            }
        });

        const video = videoResponse.data.items[0].snippet;
        const videoData = {
            thumbnail: video.thumbnails.high.url,
            channelTitle: video.channelTitle
        };

        res.json(videoData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
