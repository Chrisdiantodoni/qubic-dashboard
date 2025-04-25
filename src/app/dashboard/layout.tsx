"use client";
import createStore from "@/context";
import Sidebar from "../components/common/Sidebar";
import { SidebarItem } from "../components/common/SidebarItem";
import { LayoutDashboard, User } from "lucide-react";
import Header from "../components/common/Header";

export default function layout() {
  const { expanded } = createStore();
  return (
    <div className="flex h-screen">
      <div className="absolute left-0 top-0">
        <Sidebar>
          <SidebarItem text="Dashboard" active>
            <LayoutDashboard />
          </SidebarItem>
          <SidebarItem text="Profile">
            <User />
          </SidebarItem>
        </Sidebar>
      </div>
      <main className="flex-1 overflow-y-auto">
        <section className={`transition-all ${expanded ? "ml-50" : "ml-15"}`}>
          <div className="sticky top-0 bg-white z-10 pb-4">
            <Header title="Users" />
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Selamat datang di halaman utama! 🎉
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
