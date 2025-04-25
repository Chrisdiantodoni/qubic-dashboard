import React, { Suspense } from "react";
import { fetchUserWithPosts } from "./action";
import EditUserForm from "./edit-user-form";
import UserFormSkeleton from "./loading";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await fetchUserWithPosts(id);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      <Suspense fallback={<UserFormSkeleton />}>
        <EditUserForm user={user} />
      </Suspense>
    </div>
  );
}
