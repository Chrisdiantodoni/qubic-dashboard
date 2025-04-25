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
export default async function fetchPostUsers() {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/users-posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return (await res.json()) as {
      users: User[];
      posts: Post[];
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching the data.");
  }
}
