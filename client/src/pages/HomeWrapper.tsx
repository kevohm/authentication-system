import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import useAuth from "../hooks/useAuth";

const HomeWrapper = () => {
  const { user } = useAuth();
  return (
    <main className="h-screen flex flex-col">
      <div className="py-5 px-10 w-full bg-white p-2 flex gap-2">
        <Link
          to="/"
          className="[&.active]:font-bold [&.active]:text-indigo-600"
        >
          Home
        </Link>{" "}
        {user ? (
          <Link
            to="/posts"
            className="[&.active]:font-bold [&.active]:text-indigo-600"
          >
            Posts
          </Link>
        ) : (
          ""
        )}
        <Link
          to="/login"
          className="[&.active]:font-bold [&.active]:text-indigo-600"
        >
          Login
        </Link>
      </div>
      <hr />
      <div className="w-full h-full flex items-start py-10 justify-center bg-gray-100 overflow-y-scroll">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </main>
  );
};

export default HomeWrapper;
