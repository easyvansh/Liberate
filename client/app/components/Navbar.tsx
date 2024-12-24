"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Journal", path: "/journal" },
    { name: "Mood Tracker", path: "/mood-tracker" },
    { name: "Forum", path: "/forum" },
    { name: "Challenges", path: "/challenge" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-around">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.path}
          className={`px-4 py-2 rounded ${
            pathname === link.path ? "bg-blue-800" : "hover:bg-blue-500"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
