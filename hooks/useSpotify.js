import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react/cjs/react.development";
import spotifyApi from "../lib/spotify";

function useSpotify() {
  const { data: session, status } = useSession();

  //* this is basically error handling of our app
  useEffect(() => {
    if (session) {
      //!if there is error with refresh token as we specify in the [...nextAuth].js file then it directs the user to the login page
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken);
      // console.log("acesstoken", session.user.accessToken);
    }
  }, [session]);

  return spotifyApi;
}

export default useSpotify;
