import { ChevronDownIcon } from "@heroicons/react/outline";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react/cjs/react.development";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState, playListState } from "../atoms/playListAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs.js";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-pink-500",
  "from-yellow-500",
  "from-purple-500",
  "from-cyan-500",
  "from-orange-500",
];

function Center({ menuOpen, onChange }) {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playListIdState);
  const [playlist, setPlayList] = useRecoilState(playListState);

  useEffect(() => {
    //* shuffle() is used to get any value from the given array
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((err) => console.log("Something Wend Wrong Dude =====", err));
  }, [spotifyApi, playlistId]);

  console.log("king   ", playlist, playlistId);

  return (
    <div
      className={`flex-grow text-white h-screen w-full overflow-y-scroll scrollbar-hide `}
    >
      {/* for hidden when sidebar opens on small screen
       <div
      className={`flex-grow text-white h-screen w-full overflow-y-scroll scrollbar-hide ${
        menuOpen ? "hidden" : "inline-block"
      }`}
    > */}
      <header className="flex justify-between md:justify-end top-5 right-8 z-10">
        <img
          className=" h-6 w-6 md:hidden z-10"
          src="https://img.icons8.com/ios-filled/100/ffffff/menu-rounded.png"
          onClick={() => {
            onChange(!menuOpen);
          }}
        />
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2 "
          onClick={() => signOut()}
        >
          <img
            className="rounded-full w-4 h-4 object-cover md:w-6 md:h-6 lg:h-8 lg:w-8 xl:w-10 xl:h-10"
            src={session?.user?.image}
            alt="spotify-Logo"
          />
          <h2 className="text-sm md:text-base lg:text-lg xl:text-xl">
            {session?.user?.name}
          </h2>
          {/* <ChevronDownIcon className="h-5 w-5" /> */}
        </div>
      </header>
      {playlist ? (
        <>
          <section
            className={`flex items-end space-x-4 md:space-x-7 bg-gradient-to-b to-black ${color} h-60 md:h-80 lg:h-80 text-white p-4 pb-5 md:p-6 lg:p-8`} //p-8
          >
            <img
              className="h-28 w-28 shadow-2xl md:h-44 md:w-44 xl:h-52 xl:w-52" //h-44 w-44 shadow-2xl
              src={playlist?.images?.[0]?.url}
              alt="playlist_image"
            />
            <div>
              <p className="text-[11px] md:text-[15px] xl:text-[19px] font-bold italic">
                PLAYLIST
              </p>
              <div>
                <h1 className="text-[calc(0.8rem+3vw)] font-bold font-circular leading-[2rem] md:leading-[4rem]">
                  {/* text-2xl md:text-3xl xl:text-5xl font-bold  */}
                  {playlist?.name}
                </h1>
              </div>
            </div>
          </section>
          <div>
            <Songs playlist={playlist} />
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

// export async function getStaticProps(context) {
//   const session = await getSession(context);

//   console.log(session);

//   return {
//     props: {
//       data: session,
//     },
//   };
// }
