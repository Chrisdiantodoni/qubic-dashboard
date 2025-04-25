// app/(dashboard)/user/[id]/edit/EditUserForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User } from "../../action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Define validation schema
const schema = yup.object({
  // Basic Info
  name: yup.string().required("Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  website: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .url("Please enter a valid URL (e.g. https://example.com)"),

  // Address
  address: yup.object({
    street: yup.string().required("Street is required"),
    suite: yup.string().required("Suite/Apt is required"),
    city: yup.string().required("City is required"),
    zipcode: yup.string().required("Zipcode is required"),
    geo: yup.object({
      lat: yup.string().required("Latitude is required"),
      lng: yup.string().required("Longitude is required"),
    }),
  }),

  // Company
  company: yup.object({
    name: yup.string().required("Company name is required"),
    catchPhrase: yup.string().required("Catch phrase is required"),
    bs: yup.string().required("BS is required"),
  }),
});
interface EditUserProps {
  user: User;
}

export default function EditUserForm({ user }: EditUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      ...user,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      // Simulate API call
      window.alert(JSON.stringify(data));
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast("User Saved!!");
    } catch (error) {
      console.log(error);
      toast("Failed to Save User");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name*</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username*</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email*</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone*</Label>
            <Input id="phone" {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              {...register("website")}
              placeholder="https://example.com"
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Address Card */}
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street*</Label>
            <Input id="street" {...register("address.street")} />
            {errors.address?.street && (
              <p className="text-red-500 text-sm">
                {errors.address.street.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="suite">Suite/Apt*</Label>
            <Input id="suite" {...register("address.suite")} />
            {errors.address?.suite && (
              <p className="text-red-500 text-sm">
                {errors.address.suite.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City*</Label>
            <Input id="city" {...register("address.city")} />
            {errors.address?.city && (
              <p className="text-red-500 text-sm">
                {errors.address.city.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipcode">Zipcode*</Label>
            <Input id="zipcode" {...register("address.zipcode")} />
            {errors.address?.zipcode && (
              <p className="text-red-500 text-sm">
                {errors.address.zipcode.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lat">Latitude*</Label>
            <Input id="lat" {...register("address.geo.lat")} />
            {errors.address?.geo?.lat && (
              <p className="text-red-500 text-sm">
                {errors.address.geo.lat.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lng">Longitude*</Label>
            <Input id="lng" {...register("address.geo.lng")} />
            {errors.address?.geo?.lng && (
              <p className="text-red-500 text-sm">
                {errors.address.geo.lng.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Company Card */}
      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name*</Label>
            <Input id="companyName" {...register("company.name")} />
            {errors.company?.name && (
              <p className="text-red-500 text-sm">
                {errors.company.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="catchPhrase">Catch Phrase*</Label>
            <Input id="catchPhrase" {...register("company.catchPhrase")} />
            {errors.company?.catchPhrase && (
              <p className="text-red-500 text-sm">
                {errors.company.catchPhrase.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bs">BS*</Label>
            <Textarea id="bs" {...register("company.bs")} />
            {errors.company?.bs && (
              <p className="text-red-500 text-sm">
                {errors.company.bs.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
