"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";
import { Highlight } from "@/components/ui/hero-highlight";
import Link from "next/link";
import { Button } from "./ui/button";
import { FolderCode, User } from "lucide-react";

export function Hero() {
  const flipWords: string[] = [
    "modern",
    "fast",
    "secure",
    "scalable",
    "responsive",
    "awesome",
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-full min-w-full">
      <Highlight className="text-xl font-bold rounded-sm px-2 text-white dark:text-zinc-950">
        Jacob Brasil
      </Highlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className={cn(
          "max-w-sm sm:max-w-xl text-center text-4xl sm:text-6xl font-bold"
        )}
        layout
      >
        I build
        <FlipWords
          words={flipWords}
          className="text-blue-500 dark:text-blue-400 pr-0"
        />
        experiences for the digital world
      </motion.h1>
      <div className="flex items-center justify-center gap-4 mt-8">
        <Link href="/work">
          <div className="relative group">
            <Button
              variant="default"
              size="lg"
              className="overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center w-full justify-center">
                <FolderCode className="absolute left-[-100%] transform -translate-x-full group-hover:translate-x-33 transition-transform duration-300 ease-in-out" />
                <span className="transform group-hover:translate-x-48 transition-transform duration-300 ease-in-out">
                  View My Work
                </span>
              </span>
            </Button>
          </div>
        </Link>
        <Link href="/about">
          <div className="relative group">
            <Button
              variant="outline"
              size="lg"
              className="overflow-hidden cursor-pointer"
            >
              <span className="relative flex items-center w-full justify-center">
                <User className="absolute left-[-100%] transform -translate-x-full group-hover:translate-x-21.5 transition-transform duration-300 ease-in-out" />
                <span className="transform group-hover:translate-x-24 transition-transform duration-300 ease-in-out">
                  About Me
                </span>
              </span>
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
