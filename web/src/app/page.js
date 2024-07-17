"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-background transition-colors duration-5000">
      <button
        className="flex bg-gray-200 dark:bg-gray-800 rounded-full p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-[6vw] font-bold text-center text-primary dark:text-secondary uppercase font-mono italic tracking-tight">
          Professor Craft
        </h1>
        <h1 className="uppecase text-[3vw] text-primary uppercase font-semibold">
          Coming Soon
        </h1>
      </div>
    </main>
  );
}