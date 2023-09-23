import { useEffect } from 'react';
import RandomSong from '../components/RandomSong';
import axios from 'axios';

const HomePage = () => {
  useEffect(() => {
    // Fetch an access token from the custom API route
    axios.get('/api/auth')
      .then(response => {
        const accessToken = response.data.accessToken;
        process.env.SPOTIFY_ACCESS_TOKEN = accessToken;
      })
      .catch(error => {
        console.error('Error fetching access token:', error);
      });
  }, []);

  return (
    <div>
      <h1>Random Spotify Song</h1>
      <RandomSong />
    </div>
  );
};

export default HomePage;
