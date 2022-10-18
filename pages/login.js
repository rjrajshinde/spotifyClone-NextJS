import { getProviders, signIn } from "next-auth/react";
// import Image from "next/image";

function Login({ providers }) {
  return (
    <div className="flex flex-col items-center justify-center bg-black min-h-screen w-full">
      <img
        className="w-44 mb-5 object-contain md:w-60 xl:w-72"
        src="https://links.papareact.com/9xl"
        alt="spotify_logo"
      />
      {/* <Image
        className="h-44 w-44 md:h-36 xl:h-40 md:w-36"
        src="https://links.papareact.com/9xl"
        alt="spotify-Logo"
        objectFit="cover"
        width={250}
        height={250}
      /> */}
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] p-2 rounded-full mt-5 hover:bg-black hover:border-[#18D860] duration-300 border-transparent border-2 hover:text-white focus:ring focus:ring-[#18D860] focus:bg-black focus:text-white md:p-3 xl:p-3 md:text-lg xl:text-xl "
            onClick={() => signIn(provider.id, { callbackUrl: "/" })} //callback is the url after successful login you will be redirect to
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

//! SERVER SIDE RENDERING
//todo with this function this will run of the server before page render every time
//* any time someone comes to login page it will make sure it gets latest providers, tokens etc and then it will render the page in the server and deliver it to user
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
