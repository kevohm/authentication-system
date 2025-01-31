import { Link } from "@tanstack/react-router";

const Home = () => {
  return (
    <div  className="h-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect, Share, Discover</h1>
        <p className="text-lg md:text-xl mb-6">Join the conversation and share your thoughts with the world.</p>
        <Link to="/login" className="bg-white text-indigo-500 py-3 px-6 rounded-md text-xl hover:bg-gray-200 transition duration-300">
        Get Started
        </Link>
      </div>
  </div>
  );
};

export default Home;
