<div align="center">

# Guess The YouTuber

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)

</div>

<div align="center">

"Guess The YouTuber" is an interactive web-based guessing game inspired by [guessme.io](https://guessme.io/). Players view YouTube video thumbnails and attempt to guess the YouTuber's name. The game features a beautiful animated particle background, scoring system, lives counter, and hint system for an engaging gaming experience.

</div>

## Features

- **YouTube Thumbnail Guessing**: Random thumbnails from popular YouTubers
- **Scoring & Lives System**: Points for correct guesses, 3 lives with game over
- **Smart Hints**: Partial channel name revealed after first wrong attempt
- **Animated Particles**: 80+ floating particles with interactive effects
- **Dark Theme**: Modern glass-morphism UI design
- **Mobile Responsive**: Optimized for all devices

## Technology Stack

- **Frontend**: React 18, CSS3 animations, Axios
- **Backend**: Node.js, Express, YouTube Data API v3
- **Deployment**: Vercel

## Prerequisites
- Node.js 18+ 
- npm (Node Package Manager)
- YouTube Data API v3 key

## Quick Start

For a quick setup, run these commands:

```bash
# Clone and setup
git clone https://github.com/badhon495/Guess-The-Youtuber.git
cd Guess-The-Youtuber
npm install

# Setup environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env

# Add your YouTube API key to backend/.env file
echo "YOUTUBE_API_KEY=your_actual_api_key_here" > backend/.env

# Start both servers
npm run start:backend &
npm run start:frontend
```

Then open `http://localhost:3000` in your browser!


## Project Structure

```
Guess-The-Youtuber/
├── .env.example                # Environment variables
├── backend/
│   ├── api/index.js           # Main API endpoint
│   └── channel_names.txt      # YouTuber channels list
└── frontend/
    ├── src/
    │   ├── App.js             # Main React component
    │   └── components/        # Floating particles system
    └── public/                # Static assets
```

## How It Works

1. Backend fetches random YouTuber data using YouTube Data API v3
2. Frontend displays video thumbnail to player
3. Player guesses the YouTuber's name
4. Correct guess: +1 point, new video loads
5. Wrong guess: Hint shown, then life deducted after second wrong guess

## Troubleshooting

**API Quota Exceeded**: When YouTube API daily quota is reached, the app displays a message asking users to try again tomorrow.

**Port Conflicts**: Kill processes on port 5000: `pkill -f "node.*5000"`

**Missing API Key**: Add your YouTube API key to `backend/.env` file.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch  
5. Open a Pull Request

---

<div align="center">
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
