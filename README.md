# Who is This YouTuber?

## Overview
"Who is This YouTuber?" is a web-based guessing game where users see a YouTube video thumbnail and have to guess the name of the YouTuber. Users get points for correct answers and have three lives. If they lose all lives, the game ends. The game fetches random YouTube channels from a predefined list.

## Features
1. Display YouTube video thumbnails.
2. Ask the user to guess the name of the YouTuber.
3. Award points for correct answers.
4. Deduct lives for incorrect answers.
5. Provide a hint if the first guess is incorrect.
6. Dark mode toggle.
7. Hamburger menu with links to other projects.
8. GitHub link in the footer.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- YouTube Data API v3 key

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/who-is-this-youtuber.git
    cd who-is-this-youtuber
    ```

2. Install all dependencies for both frontend and backend:
    ```sh
    npm install
    ```
    This will install dependencies for both `frontend` and `backend` using the root `package.json` workspaces.

3. Set up your YouTube Data API key:
   - Create a file named `.env` in the root directory.
   - Add your YouTube Data API key to the `.env` file:
     ```env
     YOUTUBE_API_KEY=your_youtube_api_key
     ```
### OR
3. Go the server.js file and look for `YOUTUBE_API_KEY` variable and update it using your API key.

4. Create a file named `channel_names.txt` in the root directory and add the names of YouTube channels, each on a new line.

## Running the Project
1. Start the backend server:
    ```sh
    npm run start:backend
    ```

2. Start the frontend development server:
    ```sh
    npm run start:frontend
    ```

3. Open your web browser and navigate to `http://localhost:3000`.

## Project Structure
- `server.js`: Backend server code that fetches video data from YouTube.
- `src/`: Frontend React application code.
  - `App.js`: Main React component.
  - `App.css`: Styling for the application.
  - `index.js`: Entry point for the React application.
  - `index.css`: Global styles.

## How It Works
1. **Backend**: The server reads a random channel name from `channel_names.txt`, fetches the channel data from YouTube API, checks if the channel has more than 10 million subscribers, and retrieves the latest video thumbnail.
2. **Frontend**: The React application displays the thumbnail and asks the user to guess the YouTuber's name. If the guess is incorrect, a hint is provided. Lives are deducted for incorrect guesses, and the game ends when all lives are lost.

## Features Implementation
### Dark Mode
- A button in the header toggles dark mode by adding/removing the `dark-mode` class.

### Hamburger Menu
- A hamburger icon in the header toggles a dropdown menu with links to other projects.

### GitHub Link
- A link to your GitHub profile is displayed in the footer.

## Future Enhancements
- Add more robust error handling and user feedback.
- Expand the list of YouTubers.
- Add user authentication to track high scores.
- Add more interactive elements and animations.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
