"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("isLoggedIn") === "true";
      const user = localStorage.getItem("username") || "LegalUser";
      setIsLoggedIn(logged);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      setIsLoggedIn(false);
      router.refresh();
      // 如果是在welcome页或者是有些保密页面，可以跳回首页
      if (pathname.includes("welcome")) {
        router.push("/");
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5] border-b-4 border-slate-900 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-[0_2px_0_0_rgba(15,23,42,1)]">
      {/* Brand Logo */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl md:text-2xl p-1 bg-amber-400 border-2 border-slate-900 rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transform group-hover:-translate-y-0.5 group-hover:shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] transition-all">
            ⚖️
          </span>
          <span className="font-black text-base md:text-lg tracking-tight text-slate-900 uppercase">
            LegalDecoder
            <span className="hidden sm:inline text-[9px] font-mono ml-2 px-1.5 py-0.5 bg-slate-900 text-white rounded border border-slate-900">
              AI-POWERED
            </span>
          </span>
        </Link>
      </div>

      {/* Nav Menu */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link
          href="/"
          className={`font-black text-xs uppercase tracking-wider transition-all hover:text-amber-500 ${
            pathname === "/" ? "text-amber-500 underline decoration-2 underline-offset-4" : "text-slate-700"
          }`}
        >
          Home
        </Link>
        <Link
          href="/dictionary"
          className={`font-black text-xs uppercase tracking-wider transition-all hover:text-amber-500 ${
            pathname.startsWith("/dictionary")
              ? "text-amber-500 underline decoration-2 underline-offset-4"
              : "text-slate-700"
          }`}
        >
          Dictionary
        </Link>
        <Link
          href="/welcome"
          className={`font-black text-xs uppercase tracking-wider transition-all hover:text-amber-500 ${
            pathname.startsWith("/welcome")
              ? "text-amber-500 underline decoration-2 underline-offset-4"
              : "text-slate-700"
          }`}
        >
          App Simulator
        </Link>
      </nav>

      {/* Action Buttons */}
      <div className="flex items-center space-x-2.5">
        <Link
          href="/welcome"
          className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 bg-emerald-400 text-slate-900 text-xs font-black uppercase tracking-wider rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 hover:shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] active:translate-y-0 active:shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
        >
          📱 Simulator App
        </Link>

        {isLoggedIn ? (
          <div className="flex items-center space-x-2.5">
            <span className="hidden md:inline-block text-[11px] font-black text-slate-700 bg-white px-2.5 py-1.5 rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)]">
              👤 {username}
            </span>
            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 bg-red-400 text-slate-900 text-xs font-black uppercase tracking-wider rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 hover:shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] active:translate-y-0 active:shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="px-3.5 py-1.5 bg-amber-300 text-slate-900 text-xs font-black uppercase tracking-wider rounded-lg border-2 border-slate-900 shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 hover:shadow-[2.5px_2.5px_0px_0px_rgba(15,23,42,1)] active:translate-y-0 active:shadow-[1.5px_1.5px_0px_0px_rgba(15,23,42,1)] transition-all"
          >
            🔑 Login / Register
          </Link>
        )}
      </div>
    </header>
  );
}
