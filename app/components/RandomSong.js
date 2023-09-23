"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const RandomSong = () => {
  const [randomSong, setRandomSong] = useState(null);

  useEffect(() => {
    // Spotify API endpoint to get an access token
    const SPOTIFY_API_TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

    // Fetch an access token from Spotify
    axios
      .post(SPOTIFY_API_TOKEN_ENDPOINT, null, {
        params: {
          grant_type: "client_credentials",
        },
        auth: {
          username: "f27c7ebdfa3441248ded78b3bffab9ac",
          password: "394910398d0046b08c1dd7b89c9da612",
        },
      })
      .then((tokenResponse) => {
        const accessToken = tokenResponse.data.access_token;

        // Spotify API endpoint to get a list of featured playlists
        const SPOTIFY_API_ENDPOINT =
          "https://api.spotify.com/v1/browse/featured-playlists";

        // Fetch a list of featured playlists from Spotify
        axios
          .get(SPOTIFY_API_ENDPOINT, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            // Extract a random playlist from the list
            const playlists = response.data.playlists.items;
            const randomPlaylist =
              playlists[Math.floor(Math.random() * playlists.length)];

            // Fetch the tracks of the random playlist
            return axios.get(randomPlaylist.tracks.href, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          })
          .then((response) => {
            // Extract a random track from the playlist
            const tracks = response.data.items;
            const randomTrack =
              tracks[Math.floor(Math.random() * tracks.length)];

            setRandomSong(randomTrack.track);
          })
          .catch((error) => {
            console.error("Error fetching data from Spotify:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching Spotify access token:", error);
      });
  }, []);

  if (!randomSong) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-green-500 p-4 rounded-lg shadow-md text-center text-black">
    <p className="mb-1 text-lg font-semibold">
      <strong>Title:</strong> {randomSong.name}
    </p>
    <p className="mb-1 text-sm">
      <strong>Artist:</strong>{" "}
      {randomSong.artists.map((artist) => artist.name).join(", ")}
    </p>
    <p className="mb-4 text-sm">
      <strong>Album:</strong> {randomSong.album.name}
    </p>
    <div className="aspect-w-16 aspect-h-5">
      <iframe
        src={`https://open.spotify.com/embed/track/${randomSong.id}`}
        width="100%"
        height="auto"
        frameBorder="0"
        allowTransparency="true"
        allow="encrypted-media"
        title="Random Song"
      ></iframe>
    </div>
  </div>
  );
};

export default RandomSong;
