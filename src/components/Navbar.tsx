import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full flex fixed  max-w-[85vw] lg:max-w-[95vw] mx-auto  z-20 text-sm lg:text-lg font-bol flex-row items-center py-4 justify-between">
      <Link className="" href="/">
        Sam Sulek
      </Link>
      <div className="flex flex-row items-center justify-center gap-8">
        <Link href={"/"}>Gallery</Link>
        <Link href="/info">Info</Link>
      </div>
    </nav>
  );
}
