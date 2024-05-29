const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const YOUTUBE_API_KEY = 'AIzaSyCc8tcXVNeAX6JSaEo1RDcTZp1DHHd3Y3Q';

app.use(cors());

// Function to read channel names from the file and return a random name
const getRandomChannelName = () => {
  const filePath = path.join(__dirname, 'channel_names.txt');
  const channelNames = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  const randomIndex = Math.floor(Math.random() * channelNames.length);
  return channelNames[randomIndex];
};

// Fetch channel details by name
const fetchChannelByName = async (channelName) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: 'snippet',
      maxResults: 1,
      q: channelName,
      type: 'channel',
      key: YOUTUBE_API_KEY
    }
  });
  return response.data.items[0];
};

// Fetch random video from a channel
const fetchRandomVideo = async (channelId) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
    params: {
      part: 'snippet',
      channelId: channelId,
      maxResults: 50,
      type: 'video',
      key: YOUTUBE_API_KEY
    }
  });
  const videos = response.data.items;
  const randomVideo = videos[Math.floor(Math.random() * videos.length)];
  return {
    thumbnail: randomVideo.snippet.thumbnails.high.url,
    channelTitle: randomVideo.snippet.channelTitle
  };
};

app.get('/api/get-video', async (req, res) => {
  try {
    const channelName = getRandomChannelName();
    const channelData = await fetchChannelByName(channelName);
    const channelId = channelData.id.channelId;
    const videoData = await fetchRandomVideo(channelId);

    res.json(videoData);
  } catch (error) {
    console.error('Error fetching video data:', error);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
