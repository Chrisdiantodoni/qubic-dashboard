import React from "react";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import { Separator } from "../../../components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../../components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { startCase } from "lodash";

function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // remove empty ""
  return (
    <header className="flex justify-between h-16 shrink-0 px-4 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center justify-between gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const href = "/" + segments.slice(0, index + 1).join("/");
              const label = decodeURIComponent(
                startCase(segment.replace(/-/g, " "))
              );

              const isLast = index === segments.length - 1;

              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default Header;
