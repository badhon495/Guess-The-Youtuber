import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import sun from './components/dark_mode_image/sun.png';
import moon from './components/dark_mode_image/moon.png';


const App = () => {
    const [thumbnail, setThumbnail] = useState('');
    const [channelTitle, setChannelTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [hint, setHint] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [darkMode, setDarkMode] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const [apiDown, setApiDown] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);


    useEffect(() => {
        fetchVideoData();
    }, []);
    
    const fetchVideoData = async () => {
        try {
            const response = await axios.get('https://guess-the-youtuber.vercel.app/api/get-video');
            setThumbnail(response.data.thumbnail);
            setChannelTitle(response.data.channelTitle);
            setHint(''); // Reset hint
            setAttempts(0); // Reset attempts
            setApiDown(false); // Reset API down state
        } catch (error) {
            console.error('Error fetching video data:', error);
            setApiDown(true); // Set API down state
        }
    };


 
    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 9000);
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
    {darkMode ? <img src={sun} alt="Light Mode" /> : <img src={moon} alt="Dark Mode" />}
</button>
            </header>
            <main className="content">
                <h1>Who is This YouTuber?</h1>
                <p>Gaze upon the thumbnail and let your search prowess guide you through the digital maze. Unravel the enigma and uncover the YouTuber's name hidden within the vibrant video tapestry</p>
                {apiDown && <div className="api-down">API Down</div>}
                <div className="game-container">
                    <img src={thumbnail}/>
                    <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={userInput} 
                onChange={(e) => setUserInput(e.target.value)} 
                placeholder="Enter YouTuber's Name" 
            />
            <button type="submit" className={buttonClicked ? 'circle click' : ''}>Submit</button>
        </form>
                    {hint && <p className="hint">Hint: {hint}</p>}
                    <div className="status">
                        <p>Score: {score}</p>
                        <p>Lives: {lives}</p>
                    </div>
                </div>
            </main>
            <footer>
    Created by <a href="https://github.com/badhon495" target="_blank" rel="noopener noreferrer">badhon495</a>
</footer>
        </div>
    );
};

export default App;
