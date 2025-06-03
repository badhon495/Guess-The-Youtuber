import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FloatingParticles from './components/FloatingParticles';

const App = () => {
    const [thumbnail, setThumbnail] = useState('');
    const [channelTitle, setChannelTitle] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [hint, setHint] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [apiDown, setApiDown] = useState(false);
    const [apiError, setApiError] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        fetchVideoData();
    }, []);
    
    const fetchVideoData = async () => {
        try {
            const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
            const response = await axios.get(`${apiBaseUrl}/get-video`);
            setThumbnail(response.data.thumbnail);
            setChannelTitle(response.data.channelTitle);
            setHint(''); // Reset hint
            setAttempts(0); // Reset attempts
            setApiDown(false); // Reset API down state
            setApiError(''); // Reset API error
        } catch (error) {
            console.error('Error fetching video data:', error);
            
            if (error.response) {
                const status = error.response.status;
                const errorData = error.response.data;
                
                if (status === 403) {
                    setApiError('YouTube API quota exceeded. Please try again later.');
                } else if (status === 500) {
                    setApiError(errorData.error || 'Server error occurred.');
                } else {
                    setApiError(`API Error: ${errorData.error || 'Unknown error'}`);
                }
            } else {
                setApiError('Unable to connect to the server.');
            }
            
            setApiDown(true); // Set API down state
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setButtonClicked(true);
        setTimeout(() => setButtonClicked(false), 600);
        
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
                    alert('🎮 Game Over! Final Score: ' + score);
                    setScore(0);
                    setLives(3);
                } else {
                    fetchVideoData();
                }
            }
        }
        setUserInput('');
    };

    return (
        <div className="App">  
            <FloatingParticles />
            
            <main className="content">
                <h1>Guess The YouTuber</h1>
                <p>Look at the YouTube thumbnail and guess which YouTuber created this content. Test your knowledge and see how many you can get right!</p>
                
                {apiDown && (
                    <div className="api-down">
                        🚫 {apiError || 'API is currently down. Please try again later!'}
                    </div>
                )}
                
                <div className="game-container">
                    {thumbnail && <img src={thumbnail} alt="YouTube Thumbnail" />}
                    
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={userInput} 
                            onChange={(e) => setUserInput(e.target.value)} 
                            placeholder="Enter YouTuber's Name..." 
                            required
                        />
                        <button type="submit" className={buttonClicked ? 'circle click' : ''}>
                            Submit Guess
                        </button>
                    </form>
                    
                    {hint && (
                        <div className="hint">
                            💡 Hint: {hint}
                        </div>
                    )}
                    
                    <div className="status">
                        <p>🏆 Score: {score}</p>
                        <p>💖 Lives: {lives}</p>
                    </div>
                </div>
                <div className="footer">
                    <p>Made with ❤️ by <a href="https://github.com/badhon495" target="_blank" rel="noopener noreferrer">badhon495</a></p>
                </div>
            </main>
        </div>
    );
};

export default App;
