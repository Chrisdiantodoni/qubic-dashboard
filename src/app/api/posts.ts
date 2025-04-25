import type { NextApiResponse } from "next";

export default async function handler(res: NextApiResponse) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch posts" });
    }

    res.status(200).json(posts); // Mengirim data post
  } catch (error) {
    res.status(500).json({ error: error || "Internal Server Error" });
  }
}
