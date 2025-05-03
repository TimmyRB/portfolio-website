"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false);
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div className="relative flex flex-row items-center justify-between w-full p-4">
        <a onClick={() => router.push("/")}>
          <Image
            src={theme === "dark" ? "/logo.png" : "/logo-bg.png"}
            alt="logo"
            width={48}
            height={48}
            className="rounded-lg"
          />
        </a>

        {/* Desktop Menu */}
        <NavigationMenu className="font-bold hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/work" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Work
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contact" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hidden md:flex"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden z-50"
        >
          {isOpen ? <XIcon /> : <MenuIcon />}
        </Button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 z-40 h-full w-64 bg-background shadow-xl transition-transform duration-300 ease-in-out transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-4 pt-20 h-full">
          <nav className="flex flex-col gap-2 font-bold">
            <Link
              href="/"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/work"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/about"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>

          <div className="mt-auto p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full"
            >
              {theme === "dark" ? (
                <SunIcon className="mr-2 h-4 w-4" />
              ) : (
                <MoonIcon className="mr-2 h-4 w-4" />
              )}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
