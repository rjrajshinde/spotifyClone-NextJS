import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";
import { useState } from "react/cjs/react.development";
///king
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-black h-screen overflow-hidden">
      <title>Spotify-Clone-NextJS</title>
      <link rel="icon" href="/spotifylogo.png" />
      {/* <button
        className="hamburger hamburger--collapse is-active"
        type="button"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      > 
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>*/}
      {/* <img
        className="fixed top-3 h-6 w-6 md:hidden z-10"
        src="https://img.icons8.com/ios-filled/100/ffffff/menu-rounded.png"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      /> */}
      <main className="flex">
        {/* Sending the props and setProps function helps change the value of the
        prop of parent component from child component */}
        <Sidebar menuOpen={menuOpen} onChange={(value) => setMenuOpen(value)} />
        <Center menuOpen={menuOpen} onChange={(value) => setMenuOpen(value)} />
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}

//todo here we are prerendering the user session props on the server before it hits to client or it render to client-side means before going to the client it gets session, token etc

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      data: session,
    },
  };
}
