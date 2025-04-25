"use server";
import { cookies } from "next/headers";
import { createSession } from "./session";
import { redirect } from "next/navigation";

const mockUser = { username: "testuser", password: "testpass" };

export async function loginUser({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (username === mockUser.username && password === mockUser.password) {
    await createSession(username);
    return { message: "Login Success" };
  }

  return { message: "Invalid credentials" };
}

export async function logoutUser() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/login");
}
