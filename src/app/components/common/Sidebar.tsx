import createStore from "@/context";
import Image from "next/image";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

function Sidebar({ children }: React.PropsWithChildren) {
  const { expanded, handle } = createStore();
  return (
    <aside className="h-screen">
      <nav
        className={`h-full flex flex-col bg-white shadow-sm transition-all ${
          expanded ? "w-[calc(100%-30%)]" : "w-[calc(100%-5%)]"
        }`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <Image
            src="https://img.logoipsum.com/243.svg"
            alt=""
            width={expanded ? 128 : 0}
            height={32}
          />
          <button
            onClick={() => handle!("expanded", !expanded)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? (
              <ChevronLeftCircle className="w-6 h-6 text-slate-400 hover:text-slate-700" />
            ) : (
              <ChevronRightCircle className="w-6 h-6 text-slate-400 hover:text-slate-700" />
            )}
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        {/* <Image
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            width={10}
            height={10}
            className="w-10 h-10 rounded-md"
          /> */}
      </nav>
    </aside>
  );
}

export default Sidebar;
