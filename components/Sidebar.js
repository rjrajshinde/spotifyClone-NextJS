import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/router";

//* use this link to know about useSession and next-auth
//? https://next-auth.js.org/getting-started/example#existing-project

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react/cjs/react.development";
import useSpotify from "../hooks/useSpotify";
//? Recoil JS
import { useRecoilState } from "recoil";
import { playListIdState } from "../atoms/playListAtom";

function Sidebar({ menuOpen, onChange }) {
  const spotifyHook = useSpotify();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistsId, setPlaylistsId] = useRecoilState(playListIdState);

  useEffect(() => {
    //* if the spotifyHook we created where it checks whether there is problem or not with accessToken and for below condition if accessToken is set
    if (spotifyHook.getAccessToken()) {
      spotifyHook.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [spotifyHook, session]);

  return (
    <>
      <div
        className={`text-gray-300 w-1/5 min-w-[180px] pl-5 pt-2 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen ${
          menuOpen ? "absolute block bg-black" : "hidden"
        } md:inline-block`}
      >
        {/* For hidden on small screen
        <div
        className={`text-gray-300 w-full md:w-1/5 md:min-w-[180px] pl-5 pt-2 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen ${
          menuOpen ? "inline-block" : "hidden"
        } md:inline-block`}
      > */}

        {/**hidden */}
        {/* <div className="text-gray-500 pl-5 pt-2 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]  lg:max-w-[15rem]"> */}
        {/* <Link href="/" passHref> */}
        <Image
          className="h-10 ml-[-5px] mt-6"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="spotify-Logo"
          width="100px"
          height="70px"
          objectFit="contain"
        />
        {/* </Link> */}
        <div className="space-y-4 mb-4">
          <button className="flex items-center space-x-2 hover:text-[#37ff84]">
            <HomeIcon className="h-5 w-5" />
            <p>Home</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-[#37ff84]">
            <SearchIcon className="h-5 w-5" />
            <p>Search</p>
          </button>
          <button
            className="flex items-center space-x-2 hover:text-[#37ff84]"
            // onClick={() => router.push("/Library")}
          >
            <LibraryIcon className="h-5 w-5" />
            <p>Your Library</p>
          </button>
          <hr className="border-t-[0.1px] border-gray-900" />
          <button className="flex items-center space-x-2 hover:text-[#37ff84]">
            <PlusCircleIcon className="h-5 w-5" />
            <p>Create Playlist</p>
          </button>
          <button className="flex items-center space-x-2 hover:text-[#37ff84]">
            <HeartIcon className="h-5 w-5" />
            <p>Liked Songs</p>
          </button>

          <hr className="border-t-[0.1px] border-gray-900" />

          {/* Playlist */}
          {playlists.map((item) => (
            <p
              key={item.id}
              className="cursor-pointer hover:text-[#37ff84] truncate"
              onClick={() => {
                setPlaylistsId(item.id);
                console.log("PlayList Id    ", item.id);
                // //todo it is for to close the sidebar after clicking any link
                // onChange(!menuOpen);
              }}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>

      {/* <img
        className="absolute top-6 h-6 w-6 md:hidden"
        src="https://img.icons8.com/ios-filled/100/ffffff/menu-rounded.png"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      /> */}
    </>
  );
}

export default Sidebar;
