"use server";
import { cookies } from "next/headers";
import { createSession, verifySession } from "./session";
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
    return { message: "Login Success", success: true };
  }

  return { message: "Invalid credentials", success: false };
}

export async function logoutUser() {
  const cookiesStore = await cookies();
  cookiesStore.delete("session");
  redirect("/login");
}

export async function getUser() {
  const response = await verifySession();
  return { response };
}
