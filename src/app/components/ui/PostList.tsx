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

export function PostList({ posts, users }: PostListProps) {
  const [search, setSearch] = useState<string>("");
  // Gabungkan post dengan user-nya
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
  }, [posts, users, search]);

  return (
    <>
      <div className="mb-3 w-full">
        <div className="mb-3">
          <SearchBar
            placeholder="Search title, description, and author"
            value={search}
            onChange={(value) => setSearch(value)}
          />
        </div>
        {filteredPostWithUsers.length === 0 ? (
          <p className="text-gray-600">No posts available.</p>
        ) : (
          filteredPostWithUsers.map(({ id, title, body, user }) => (
            <div
              key={id}
              className="mb-6 p-4 border rounded-lg shadow-sm bg-white"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="text-gray-700 mb-2">{body}</p>
              {user ? (
                <p className="text-sm text-gray-500">
                  By: <span className="font-medium">{user.name}</span> (@
                  {user.username})
                </p>
              ) : (
                <p className="text-sm text-red-500 italic">Unknown author</p>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
