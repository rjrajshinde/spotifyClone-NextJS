import SpotifyWebApi from "spotify-web-api-node";

//? this is basically are the actions that the user can do on this app like user can play the music, he can check the recently played album etc.

////////////////////////////
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

// const LOGIN_URL =
//   "https://accounts.spotify.com/authorize?" + queryParamString.toString();
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

var spotifyApi = new SpotifyWebApi({
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  // redirectUri: process.env.NEXTAUTH_URL,
});

export default spotifyApi;
export { LOGIN_URL };
