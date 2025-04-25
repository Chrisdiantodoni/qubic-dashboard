import { Suspense } from "react";
import fetchUsers from "./action";
import Loading from "./loading";
import UserTable from "@/app/components/ui/UserTable";

export default async function Page() {
  try {
    const { users } = await fetchUsers();

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <Suspense fallback={<Loading />}>
          <UserTable users={users} />
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
