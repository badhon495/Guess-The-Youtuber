# Guess The YouTuber

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)

</div>

## Overview
"Guess The YouTuber" is an interactive web-based guessing game inspired by [guessme.io](https://guessme.io/). Players view YouTube video thumbnails and attempt to guess the YouTuber's name. The game features a beautiful animated particle background, scoring system, lives counter, and hint system for an engaging gaming experience.

## Features

### Core Game Features
- **YouTube Thumbnail Display**: Random thumbnails from popular YouTubers
- **Intelligent Scoring System**: Points awarded for correct guesses
- **Lives System**: 3 lives with game over mechanics
- **Smart Hint System**: Partial channel name revealed after first wrong attempt
- **Real-time Feedback**: Instant response to player inputs

### Visual Features
- **Animated Particle Background**: 80+ floating particles inspired by guessme.io
- **Dark Theme Design**: Modern dark aesthetic with glass-morphism effects
- **Interactive Animations**: 
  - 4 different particle movement patterns (floating, wave, zigzag, spiral)
  - Mouse hover effects that scale and brighten particles
  - Click burst effects with radial particle explosions
- **Mobile Responsive**: Optimized for all screen sizes
- **Glass-morphism UI**: Modern backdrop blur effects


## Technology Stack

### Frontend
- **React 18.x**: Modern React with hooks
- **CSS3**: Advanced animations and glass-morphism effects
- **Axios**: HTTP client for API requests
- **Custom Particles System**: JavaScript + CSS animated background

### Backend
- **Node.js**: Serverless functions
- **Express.js**: Web framework
- **YouTube Data API v3**: Fetching channel and video data
- **Vercel**: Deployment platform

### Development Tools
- **Create React App**: React development environment
- **npm Workspaces**: Monorepo management
- **ESLint**: Code linting
- **Git**: Version control

## Prerequisites
- Node.js 18+ 
- npm (Node Package Manager)
- YouTube Data API v3 key

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/badhon495/Guess-The-Youtuber.git
   cd Guess-The-Youtuber
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This installs dependencies for both frontend and backend using npm workspaces.

3. **Set up YouTube Data API key:**
   - Create `.env` file in the root directory
   - Add your API key:
     ```env
     YOUTUBE_API_KEY=your_youtube_api_key_here
     ```
   
   **Alternative:** Update the API key directly in `backend/api/index.js`

4. **Configure channels (optional):**
   - Edit `backend/channel_names.txt` to add/remove YouTuber channels
   - Each channel name should be on a new line

## Running the Project

### Development Mode
1. **Start backend server:**
   ```bash
   npm run start:backend
   ```

2. **Start frontend development server:**
   ```bash
   npm run start:frontend
   ```

3. **Open browser:** Navigate to `http://localhost:3000/Guess-The-Youtuber`

### Production
The project is deployed on Vercel and accessible at the live URL.

## Project Structure

```
Guess-The-Youtuber/
├── package.json                 # Root package.json with workspaces
├── README.md                   # Project documentation
├── vercel.json                 # Vercel deployment config
├── backend/                    # Backend serverless functions
│   ├── api/
│   │   └── index.js           # Main API endpoint
│   ├── channel_names.txt      # YouTuber channels list
│   ├── package.json           # Backend dependencies
│   └── vercel.json            # Backend Vercel config
└── frontend/                   # React frontend application
    ├── public/                 # Static assets
    ├── src/
    │   ├── App.js             # Main React component
    │   ├── App.css            # Main styling with dark theme
    │   ├── components/
    │   │   ├── FloatingParticles.js   # Custom particles system
    │   │   └── FloatingParticles.css  # Particles animations
    │   └── index.js           # React entry point
    ├── package.json           # Frontend dependencies
    └── PARTICLES_IMPLEMENTATION.md   # Particles documentation
```

## Particles System

### Implementation
- **Custom JavaScript + CSS**: 80 animated particles with varied colors
- **Performance Optimized**: GPU-accelerated transforms and will-change properties
- **Interactive Effects**: Mouse hover scaling, click burst animations
- **Multiple Patterns**: 4 different animation types for visual variety

### Color Palette
```javascript
['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a8e6cf', '#ff8a80', '#ff9ff3', '#54a0ff', '#5f27cd']
```

### Animation Types
1. **Standard Float**: Straight upward movement with rotation
2. **Wave Motion**: Side-to-side floating pattern  
3. **Zigzag**: Dynamic left-right movement
4. **Spiral**: Rotating movement with scaling effects

## How It Works

### Backend Flow
1. Reads random channel name from `channel_names.txt`
2. Fetches channel data using YouTube Data API v3
3. Validates channel has sufficient subscribers (10M+)
4. Retrieves latest video thumbnail and metadata
5. Returns data to frontend via `/api/get-video` endpoint

### Frontend Flow
1. Displays YouTube thumbnail to player
2. Accepts player's guess through input form
3. Compares guess with actual channel name (case-insensitive)
4. **Correct guess**: Increment score, load new video
5. **First wrong guess**: Show hint (partial channel name)
6. **Second wrong guess**: Deduct life, load new video
7. **Game over**: All lives lost, display final score

### Game Mechanics
- **Scoring**: +1 point per correct guess
- **Lives**: Start with 3 lives
- **Hints**: Partial channel name after first wrong attempt
- **Reset**: Game resets after all lives lost

## Deployment

### Vercel Deployment
The project is configured for automatic deployment on Vercel:

1. **Frontend**: Deployed as static React app
2. **Backend**: Deployed as serverless functions
3. **Environment Variables**: Configure `YOUTUBE_API_KEY` in Vercel dashboard
4. **Custom Domain**: Supports custom domain configuration

### Build Commands
```bash
# Frontend build
npm run build

# Deploy to Vercel
vercel --prod
```

## Future Enhancements

### Planned Features
- **Difficulty Levels**: Easy, Medium, Hard based on subscriber count
- **Multiplayer Mode**: Real-time competitive gameplay
- **User Authentication**: Account system with persistent high scores
- **Statistics Dashboard**: Player performance analytics
- **More Particle Effects**: Additional visual enhancements
- **Sound Effects**: Audio feedback for interactions
- **Leaderboard**: Global and friends leaderboards
- **Social Sharing**: Share scores on social media

### Technical Improvements
- **Progressive Web App**: Offline capability and app-like experience
- **Database Integration**: User data persistence
- **Caching System**: Improve API response times
- **Analytics**: User behavior tracking
- **Internationalization**: Multi-language support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
