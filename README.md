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
- **Backend**: Netlify Functions, YouTube Data API v3
- **Deployment**: Netlify
- **Live URL**: https://guess-the-youtuber-game.netlify.app

## Prerequisites
- Node.js 18+ 
- npm (Node Package Manager)
- YouTube Data API v3 key
- Netlify CLI (for deployment)

## Quick Start

For local development:

```bash
# Clone the repository
git clone https://github.com/badhon495/Guess-The-Youtuber.git
cd Guess-The-Youtuber

# Install frontend dependencies
cd frontend && npm install

# Start local development
npm start
```

For Netlify Functions testing:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development with functions
netlify dev
```

Then open `http://localhost:3000` in your browser!


## Project Structure

```
Guess-The-Youtuber/
├── netlify.toml               # Netlify deployment configuration
├── api/                       # Netlify Functions
│   ├── health.js             # Health check endpoint
│   └── get-video.js          # Main game API endpoint
├── frontend/                  # React application
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── components/       # Floating particles system
│   │   └── index.js          # React entry point
│   └── public/               # Static assets
└── backend/
    └── channel_names.txt     # YouTuber channels list (reference)
```

## How It Works

1. Netlify Functions fetch random YouTuber data using YouTube Data API v3
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
