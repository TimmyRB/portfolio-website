"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center mb-16 max-w-xl">
        This is not the page you are looking for 🖐️
      </h1>
      <Link href="/">
        <Button variant="secondary">Return Home</Button>
      </Link>
    </div>
  );
}
