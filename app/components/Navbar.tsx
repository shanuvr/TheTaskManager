"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold tracking-wide">Task Tracker</h1>

      <div className="flex gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/add" className="hover:underline">
          Add Task
        </Link>
        <Link href="/about" className="hover:underline">
          About
        </Link>
      </div>
    </nav>
  );
}
