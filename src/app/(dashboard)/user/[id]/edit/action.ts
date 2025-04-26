"use server";
import { headers } from "next/headers";

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
// lib/api.ts
export async function fetchUserWithPosts(userId: string) {
  const host = (await headers()).get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/users-posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const user = data.users.find((user: User) => user.id.toString() === userId);

  if (!user) {
    throw new Error("User not found");
  }

  const userPosts = data.posts.filter(
    (post: Post) => post.userId.toString() === userId
  );

  return {
    user,
    posts: userPosts,
  };
}
