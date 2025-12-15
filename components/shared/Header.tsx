"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-background backdrop-blur-md border-b border-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold hover:text-foreground/90"
          >
            Next.js
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm font-normal">
          <Link
            className={`${
              pathname === "/" ? "text-blue-500" : ""
            } hover:text-foreground/90`}
            href="/"
          >
            Home
          </Link>
          <Link
            className={`${
              pathname === "/posts" ? "text-blue-500" : ""
            } hover:text-foreground/90`}
            href="/posts"
          >
            Posts
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
