"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "@/app/auth/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const schema = yup.object({
  username: yup.string().min(3).max(10).required("Username is required"),
  password: yup.string().min(8).max(100).required("Password is required"),
});

type FormData = {
  username: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await loginUser(data);
      return response;
    },
    onSuccess: (res) => {
      if (res?.success) {
        toast.success(res?.message);
        router.replace("/dashboard");
      } else {
        toast.error(res.message);
      }
    },
    onError: (res) => {
      toast.error(res?.message);
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <button onClick={() => toast.success("Toast")}>Render Toast</button>

      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin h-4 w-4" />
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
