<div align="center">

> **⚠️ <span style="color: red;">DEPLOY BRANCH</span> ⚠️**  
> **<span style="color: red;">Deploy branch is different than the main branch. This branch is optimized for Netlify deployment.</span>**

# Guess The YouTuber

![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)
![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=flat-square&logo=netlify)

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

### For Local Development:

```bash
# Clone the repository (use deploy branch)
git clone -b deploy https://github.com/badhon495/Guess-The-Youtuber.git
cd Guess-The-Youtuber

# Install root dependencies (for Netlify Functions)
npm install

# Install frontend dependencies
cd frontend && npm install

# Start local development
npm start
```

### For Local Testing with Netlify Functions:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# From project root, start local development with functions
netlify dev
```

### For Production Deployment:

See the [Netlify Deployment](#netlify-deployment) section below.

Then open `http://localhost:3000` in your browser!


## Project Structure

```
Guess-The-Youtuber/
├── netlify.toml               # Netlify deployment configuration
├── package.json               # Root dependencies (Netlify Functions)
├── api/                       # Netlify Functions
│   ├── health.js             # Health check endpoint
│   └── get-video.js          # Main game API endpoint
├── frontend/                  # React application
│   ├── package.json          # Frontend dependencies
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── components/       # Floating particles system
│   │   └── index.js          # React entry point
│   └── public/               # Static assets
└── backend/
    ├── .env                  # YouTube API key (not in repo)
    └── channel_names.txt     # YouTuber channels list (reference)
```

## Netlify Deployment

### Option 1: Git-based Deployment (Recommended)

1. **Connect to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your GitHub account
   - Select this repository: `badhon495/Guess-The-Youtuber`
   - Choose the `deploy` branch (this branch)

2. **Configure Build Settings**:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

3. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add: `YOUTUBE_API_KEY` = `your_youtube_api_key_here`

4. **Deploy**:
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

### Option 2: Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
cd frontend && npm run build

# Deploy (from project root)
netlify deploy --prod --dir frontend/build --functions api
```

### Auto-Deploy Setup

Once connected to Git, Netlify will automatically deploy when you push to the `deploy` branch:

```bash
git add .
git commit -m "Your changes"
git push origin deploy
```

### Environment Variables Required

- `YOUTUBE_API_KEY`: Your YouTube Data API v3 key

### Netlify Functions

The project uses Netlify Functions located in the `/api` directory:
- `/api/health.js` - Health check endpoint
- `/api/get-video.js` - Main game API

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
