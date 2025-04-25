import { headers } from "next/headers";

interface Geo {
  lat: string;
  lng: string;
}
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default async function fetchUsers() {
  try {
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    const res = await fetch(`${baseUrl}/api/users`, {
      next: { revalidate: 60 },
    });
    console.log(res);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return (await res.json()) as {
      users: User[];
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching the data.");
  }
}
