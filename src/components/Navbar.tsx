import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="w-full flex   z-20 text-lg font-bold flex-row items-center py-4 justify-between">
      <Link href="/">Sam Sulek</Link>
      <Link href="/info">Info</Link>
    </nav>
  );
}
