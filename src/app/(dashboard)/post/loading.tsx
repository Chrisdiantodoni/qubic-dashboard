export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Loading...
      </h1>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse border p-4 rounded-lg shadow-sm 
                      bg-gray-100 dark:bg-gray-800
                      border-gray-200 dark:border-gray-700"
          >
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-2" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-1" />
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
