import { Skeleton } from "@/components/ui/skeleton";

export default function UserFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Basic Information Card Skeleton */}
      <div className="rounded-lg border bg-card dark:bg-card/80 p-6 shadow-sm dark:border-gray-800">
        <Skeleton className="h-8 w-1/4 mb-6 bg-gray-300 dark:bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={`basic-${i}`} className="space-y-2">
              <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Address Card Skeleton */}
      <div className="rounded-lg border bg-card dark:bg-card/80 p-6 shadow-sm dark:border-gray-800">
        <Skeleton className="h-8 w-1/4 mb-6 bg-gray-300 dark:bg-gray-700" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={`address-${i}`} className="space-y-2">
              <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Company Card Skeleton */}
      <div className="rounded-lg border bg-card dark:bg-card/80 p-6 shadow-sm dark:border-gray-800">
        <Skeleton className="h-8 w-1/4 mb-6 bg-gray-300 dark:bg-gray-700" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={`company-${i}`} className="space-y-2">
              <Skeleton className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700" />
              {i === 2 ? (
                <Skeleton className="h-20 w-full bg-gray-100 dark:bg-gray-800" />
              ) : (
                <Skeleton className="h-10 w-full bg-gray-100 dark:bg-gray-800" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex justify-end gap-4">
        <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-32 bg-gray-300 dark:bg-gray-600" />
      </div>
    </div>
  );
}
