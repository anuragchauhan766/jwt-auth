import Navbar from "@components/Navbar/Navbar";

function Home() {
  return (
    <div className="bg-dark-blue w-full h-full ">
      <div className=" flex w-full h-screen  p-10 flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center w-full flex-col space-y-5 h-full">
          <h1 className="font-extrabold text-7xl  bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
            JWT Auth
          </h1>
          <p className="text-white font-bold text-xl ">
            Stay Authenticated, Stay Secure
          </p>
        </div>
      </div>
      <hr className="border-black" />
      <footer className="w-full bg-dark-blue flex items-center justify-center p-5">
        <p className="text-white font-light text-lg">
          Made with ❤️ by Anurag Singh Chauhan
        </p>
      </footer>
    </div>
  );
}

export default Home;
