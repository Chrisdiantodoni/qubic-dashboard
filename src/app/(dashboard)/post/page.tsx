import React, { Suspense } from "react";
import Loading from "./loading";
import { PostList } from "@/app/components/ui/PostList";
import fetchPostUsers from "./action";

const MemoizedPostList = React.memo(PostList); // Memoize PostList

export default async function Page() {
  try {
    const { users, posts } = await fetchPostUsers();

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Posts & Authors</h1>
        <Suspense fallback={<Loading />}>
          <MemoizedPostList posts={posts} users={users} />
        </Suspense>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Something went wrong</h1>
        <p className="text-red-500">
          {error instanceof Error
            ? error.message
            : "An unexpected error occurred."}
        </p>
      </div>
    );
  }
}
