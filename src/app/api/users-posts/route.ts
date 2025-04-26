import { NextResponse } from "next/server";

// Define types for our data
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type Post = {
  userId: number;
  user: User;
  id: number;
  title: string;
  body: string;
};

export async function GET() {
  try {
    // Parallel fetching of users and posts
    const [usersRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users"),
      fetch("https://jsonplaceholder.typicode.com/posts"),
    ]);

    if (!usersRes.ok || !postsRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const users: User[] = await usersRes.json();
    const posts: Post[] = await postsRes.json();

    // Create a map of users by ID for efficient lookup
    const usersMap = new Map<number, User>();
    users.forEach((user) => usersMap.set(user.id, user));

    // Associate posts with users without modifying original objects
    const postsWithUsers = posts.map((post) => ({
      ...post,
      user: usersMap.get(post.userId),
    }));

    return NextResponse.json({
      users,
      posts: postsWithUsers,
      usersMap: Object.fromEntries(usersMap), // Optional: include the map if needed
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
