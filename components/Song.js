import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingSongState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { signOut, useSession } from "next-auth/react";
import SpotifyPlayer from "react-spotify-web-playback";

function Song({ order, track }) {
  const spotify = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlayingSong, setIsPlayingSong] = useRecoilState(isPlayingSongState);

  const PlaySong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlayingSong(true);
    spotify.play({ uris: [track.track.uri] });
  };

  console.log("Tack", track.track);

  //* to convert Miliseconds to Minutes and seconds
  const mstoMin = (time) => {
    var minutes = Math.floor(time / 60000);
    var seconds = ((time % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div
      className="grid grid-cols-none gap-x-30 md:grid-cols-2 text-gray-500 py-1 md:py-4 lg:py-4 px-3 md:px-3 hover:bg-gray-900 cursor-pointer"
      onClick={PlaySong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-5 w-5 md:h-8 md:w-8"
          src={track.track.album.images[0].url}
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-36">{track.track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline md:w-3/4 truncate ">
          {track.track.album.name}
        </p>
        <p>{mstoMin(track.track.duration_ms)}</p>
      </div>
      {/* <SpotifyPlayer
        token={session.user.accessToken}
        uris={[track.track.uri]}
      /> */}
    </div>
  );
}

export default Song;
