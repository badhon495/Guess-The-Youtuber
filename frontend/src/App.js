import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [thumbnail, setThumbnail] = useState('');
    const [channelTitle, setChannelTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [hint, setHint] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [darkMode, setDarkMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        fetchVideoData();
    }, []);

    const fetchVideoData = async () => {
        try {
            const response = await axios.get('/api/get-video');
            setThumbnail(response.data.thumbnail);
            setChannelTitle(response.data.channelTitle);
            setHint(''); // Reset hint
            setAttempts(0); // Reset attempts
        } catch (error) {
            console.error('Error fetching video data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.toLowerCase() === channelTitle.toLowerCase()) {
            setScore(score + 1);
            fetchVideoData();
        } else {
            if (attempts === 0) {
                // First wrong attempt, provide a hint
                setHint(channelTitle.substring(0, Math.floor(channelTitle.length / 2)) + '...');
                setAttempts(attempts + 1);
            } else {
                // Second wrong attempt, decrement lives
                setLives(lives - 1);
                if (lives <= 1) {
                    alert('Game Over');
                    setScore(0);
                    setLives(3);
                } else {
                    fetchVideoData();
                }
            }
        }
        setUserInput('');
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
            <header>
                <div className="hamburger" onClick={toggleMenu}>
                    &#9776;
                </div>
                {menuOpen && (
                    <nav className="dropdown-menu">
                        <ul>
                            <li><a href="#guess-the-word">Guess the Word</a></li>
                            <li><a href="#other-project-2">Other Project 2</a></li>
                            <li><a href="#other-project-3">Other Project 3</a></li>
                        </ul>
                    </nav>
                )}
                <button className="dark-mode-button" onClick={toggleDarkMode}>
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <main className="content">
                <h1>Who is This YouTuber?</h1>
                <p>Enter the name of the YouTuber whose video is shown below. As there is no time limit, use your search skill to find the youtuber name.</p>
                <div className="game-container">
                    <img src={thumbnail} alt="YouTube Thumbnail" />
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={userInput} 
                            onChange={(e) => setUserInput(e.target.value)} 
                            placeholder="Enter YouTuber's Name" 
                        />
                        <button type="submit">Submit</button>
                    </form>
                    {hint && <p className="hint">Hint: {hint}</p>}
                    <div className="status">
                        <p>Score: {score}</p>
                        <p>Lives: {lives}</p>
                    </div>
                </div>
            </main>
            <footer>
                <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer">
                    My GitHub
                </a>
            </footer>
        </div>
    );
};

export default App;
