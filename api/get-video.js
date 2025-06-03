const axios = require('axios');
const path = require('path');

// For Netlify Functions deployment
exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'Content-Type': 'application/json'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Channel names embedded directly for Netlify Functions
        const channelNames = [
            "T-Series", "PewDiePie", "MrBeast", "Like Nastya", "Kids Diana Show", "WWE",
            "Zee Music Company", "Vlad and Niki", "5-Minute Crafts", "BLACKPINK",
            "Justin Bieber", "Dude Perfect", "Eminem", "Taylor Swift", "Ed Sheeran",
            "Ariana Grande", "Billie Eilish", "BTS", "TWICE", "ITZY", "aespa",
            "NewJeans", "IVE", "LE SSERAFIM", "NMIXX", "(G)I-DLE", "Red Velvet",
            "MAMAMOO", "Oh My Girl", "GFRIEND", "MOMOLAND", "EVERGLOW", "LOONA",
            "Markiplier", "jacksepticeye", "VanossGaming", "Ninja", "Pokimane",
            "Logan Paul", "Jake Paul", "James Charles", "Jeffree Star", "Shane Dawson"
        ];
        
        const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)].trim();
        const API_KEY = process.env.YOUTUBE_API_KEY;
        
        console.log(`Searching for channel: ${randomChannelName}`);
        console.log(`API Key present: ${API_KEY ? 'Yes' : 'No'}`);
        
        if (!API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: 'YouTube API key not configured',
                    details: 'Please set YOUTUBE_API_KEY in environment variables'
                })
            };
        }
        
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
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                thumbnail: videoData.thumbnails.high.url,
                channelTitle: videoData.channelTitle
            })
        };
    } catch (error) {
        console.error('API Error:', error.message);
        console.error('Full error:', error.response?.data || error);
        
        // Return proper error response for quota exceeded
        if (error.response && error.response.status === 403) {
            return {
                statusCode: 403,
                headers,
                body: JSON.stringify({
                    error: 'YouTube API quota exceeded',
                    message: 'Daily quota limit has been reached. Please try again tomorrow.',
                    details: error.response.data
                })
            };
        }
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Server Error',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            })
        };
    }
};
