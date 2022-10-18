import { ChevronDownIcon } from "@heroicons/react/outline";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react/cjs/react.development";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState, playListState } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs.js";

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const [playlist, setPlayList] = useRecoilState(mySavedAlbumsState);

  useEffect(() => {
    spotifyApi
      .getMySavedAlbums({
        limit: 1,
        offset: 0,
      })
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((err) => console.log("Something Wend Wrong Dude =====", err));
  }, [spotifyApi, playlistId]);

  console.log("king   ", playlist, playlistId);

  return (
    <div className="flex-grow text-white">
      {/* <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => signOut()}
        >
          <img
            className="rounded-full w-2 h-2 object-cover sm:w-3 sm:h-3 md:w-6 md:h-6 lg:h-8 lg:w-8 xl:w-10 xl:h-10"
            src={session?.user?.image}
            alt="spotify-Logo"
          />
          <h2 className="text-sm md:text-base lg:text-lg xl:text-xl">
            {session?.user?.name}
          </h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header> */}
      {playlist ? (
        <>
          <section
            className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-60 text-white p-6`} //p-8
          >
            <img
              className="h-20 w-20 shadow-2xl md:h-36 xl:h-40 md:w-36 xl:w-40" //h-44 w-44 shadow-2xl
              src={playlist?.images?.[0]?.url}
              alt="playlist_image"
            />
            <div>
              <p className="text-[11px] md:text-[15px] xl:text-[19px]">
                PLAYLIST
              </p>
              <h1 className="text-sm md:text-2xl xl:text-4xl font-bold tracking-wider">
                {/* text-2xl md:text-3xl xl:text-5xl font-bold  */}
                {playlist?.name}
              </h1>
            </div>
          </section>
          <div>
            <Songs />
          </div>
        </>
      ) : (
        <div className="grid place-items-center h-screen">
          <div className="grid place-items-center">
            <img
              className="w-44 mb-5 object-contain sm:w-44 md:w-60 xl:w-72 m-0 hover:transition duration-500 hover:scale-110"
              src="https://www.cityalight.com/wp-content/uploads/2021/03/Spotify.png?w=640"
              // src="https://links.papareact.com/9xl"
              alt="spotify_logo"
            />
            <h4>
              Welcome{" "}
              <span className="text-[#18D860]">{session?.user?.name}</span> to
              Spotify Clone
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Center;
