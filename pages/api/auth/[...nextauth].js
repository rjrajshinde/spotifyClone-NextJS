import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

//todo this method is used to refresh the access token that has been expired here we are sending the accessToken and refreshToken to spotify
const refreshAccessToken = async (token) => {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    //* this method is used for send the accessToken and refreshToken to Spotify and bring the accessToken that has been refreshed
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();

    // console.log("Refreshed token is", refreshedToken);

    //todo and here we return the refreshedToken as accessToken and expires Time
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, //? 1 Hour
      //? here if the refreshedToken exist then use the existing token otherwise use previous token (token.refreshToken)
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      //*if it is Initial Sign in here we get our first token
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      //*and after we come back to this page it will check whether the token in expired of not and then if it not expired and token is still valid then use the existing token otherwise it goes to following method of refreshAccessToken(token)
      if (Date.now() < token.accessTokenExpires) {
        console.log("Existing Token is valid");
        return token;
      }

      //* if access token expired, then we need new token
      console.log("Token is Expired and Refreshing to get new Tken");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
