"use client";

import * as React from "react";
import Image from "next/image";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="w-full flex justify-center items-center p-4  ">
          <Image
            src="https://img.logoipsum.com/243.svg"
            width={160}
            height={80}
            alt="Team logo"
            className="object-contain transition-all duration-300 hover:scale-105"
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
