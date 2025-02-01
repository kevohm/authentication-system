import { Link } from "@tanstack/react-router";
import homeBg from "../assets/home.jpg";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  return (
    <div
      className={`h-full w-full flex items-center justify-center text-white py-20 text-center`}
      style={{
        background: "rgba(0,0,0,1)",
        backgroundImage: `url(${homeBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top",
        backgroundBlendMode: "screen",
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Connect, Share, Discover
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Join the conversation and share your thoughts with the world.
        </p>
        <Link
          to={user ? "/posts" : "/login"}
          className="bg-indigo-600 text-white py-3 px-6 rounded-md text-xl hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
