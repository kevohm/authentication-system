import { Link } from "@tanstack/react-router";
import { Post } from "../types/post.types";

import UserCard from "./UserCard";

const SinglePost = (post: Post) => {
  return (
    <div
      key={post.id}
      className="bg-white flex flex-col justify-between rounded-lg shadow-md max-w-lg p-5 space-y-5"
    >
      <div>
        <Link
          to="/posts/$postId"
          params={{ postId: post.id }}
          className="text-xl text-indigo-500 font-bold"
        >
          {post.title}
        </Link>
        <p className="mt-2 text-gray-700">
          {post.content.length > 150
            ? `${post.content.slice(0, 150)}...`
            : post.content}
        </p>
      </div>
      <p className="mt-4 flex space-x-2 items-center text-sm text-gray-500">
        <strong>{post.published?"Published By":"Written By"}</strong>
        <UserCard userId={post.authorId} />
      </p>
    </div>
  );
};

export default SinglePost;
