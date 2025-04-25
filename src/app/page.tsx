"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
          Login to Dashboard
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label">Username</label>
            <input
              {...register("username")}
              className="input"
              placeholder="testuser"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              {...register("username")}
              className="input"
              placeholder="testuser"
            />
          </div>
          <div>
            <button
              type="submit"
              className="button bg-teal-500 hover:bg-teal-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
