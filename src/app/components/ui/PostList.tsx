"use client";
import { useMemo, useState } from "react";
import { SearchBar } from "./SearchBar";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
}

interface User {
  id: number;
  name: string;
  username: string;
}

interface PostListProps {
  posts: Post[];
  users: User[];
}

export function PostList({ posts }: PostListProps) {
  const [search, setSearch] = useState<string>("");

  const filteredPostWithUsers = useMemo(() => {
    return posts.filter(({ title, body, user }) => {
      const lowerSearch = search.toLowerCase();
      return (
        title.toLowerCase().includes(lowerSearch) ||
        body.toLowerCase().includes(lowerSearch) ||
        user?.name.toLowerCase().includes(lowerSearch) ||
        user?.username.toLowerCase().includes(lowerSearch)
      );
    });
  }, [posts, search]);

  return (
    <div className="mb-3 w-full">
      <div className="mb-3">
        <SearchBar
          placeholder="Search title, description, and author"
          value={search}
          onChange={(value) => setSearch(value)}
        />
      </div>

      {filteredPostWithUsers.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No posts available.</p>
      ) : (
        filteredPostWithUsers.map(({ id, title, body, user }) => (
          <div
            key={id}
            className="mb-6 p-4 border rounded-lg shadow-sm 
                      bg-white dark:bg-gray-800
                      border-gray-200 dark:border-gray-700
                      hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{body}</p>
            {user ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By:{" "}
                <span className="font-medium dark:text-gray-200">
                  {user.name}
                </span>{" "}
                (@
                {user.username})
              </p>
            ) : (
              <p className="text-sm text-red-500 dark:text-red-400 italic">
                Unknown author
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
