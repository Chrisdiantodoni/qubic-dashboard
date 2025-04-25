// app/components/ui/UserLoadingSkeleton.tsx
import React from "react";

export default function UserLoadingSkeleton() {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-8 w-1/4 bg-gray-200 rounded mb-6"></div>

      {/* User Profile Card Skeleton */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gray-300 h-16 p-6"></div>

        <div className="p-6 space-y-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start">
              <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
              <div className="w-2/3 h-4 bg-gray-100 rounded ml-2"></div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-3"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-3 w-3/4 bg-gray-100 rounded mb-2"></div>
          ))}
        </div>
      </div>

      {/* Posts Loading Skeleton */}
      <div className="mt-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border p-4 rounded-lg">
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-100 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
