import React, { Suspense } from "react";
import { fetchUserWithPosts } from "./action";
import { PostList } from "@/app/components/ui/PostList";
import UserLoadingSkeleton from "./loading";

async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { user, posts } = await fetchUserWithPosts(id);

  return (
    <>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden dark:bg-gray-800">
        <div className=" bg-blue-500 p-6 dark:bg-gray-700">
          <h2 className="text-2xl font-bold text-slate-50">User Profile</h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-start">
            <div className="w-1/3">
              <span className="text-gray-500 dark:text-slate-50 font-medium">
                Name
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-gray-800 font-semibold dark:text-slate-300">
                {user.name}
              </span>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <span className="text-gray-500  dark:text-slate-50 font-medium">
                Username
              </span>
            </div>
            <div className="w-2/3">
              <span className="text-gray-800 font-semibold dark:text-slate-300">
                @{user.username}
              </span>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <span className="text-gray-500  dark:text-slate-50 font-medium">
                Email
              </span>
            </div>
            <div className="w-2/3">
              <a
                href={`mailto:${user.email}`}
                className="text-blue-600 hover:underline dark:text-slate-300"
              >
                {user.email}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <span className="text-gray-500  dark:text-slate-50 font-medium">
                Phone
              </span>
            </div>
            <div className="w-2/3">
              <a
                href={`tel:${user.phone}`}
                className="text-gray-800 hover:text-blue-600 hover:dark:text-blue-300 dark:text-slate-300"
              >
                {user.phone || <span className="text-gray-400">N/A</span>}
              </a>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-1/3">
              <span className="text-gray-500 font-medium  dark:text-slate-50">
                Website
              </span>
            </div>
            <div className="w-2/3">
              {user.website ? (
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  {user.website}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <span className="text-gray-400">N/A</span>
              )}
            </div>
          </div>
        </div>

        {user.address && (
          <div className="border-t border-gray-100 p-6 bg-gray-50 rounded-b-xl dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-slate-50">
              Address
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-slate-300">
              <p>{user.address.street}</p>
              <p>{user.address.suite}</p>
              <p>
                {user.address.city}, {user.address.zipcode}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-300">
                {user.address.geo.lat}, {user.address.geo.lng}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-6 mt-5">
        <PostList posts={posts} users={user} />
      </div>
    </>
  );
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">User Detail</h1>
        <Suspense fallback={<UserLoadingSkeleton />}>
          <UserProfile params={params} />
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
