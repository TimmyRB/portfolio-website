"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { FolderCode, MenuIcon, MoonIcon, SunIcon, XIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/contentful-types";
import React from "react";

export function NavbarClient({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar when route changes
  useEffect(() => {
    if (theme === "system") {
      setTheme(
        window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark"
      );
    }

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
    <header className="sticky top-0 z-50 bg-background">
      <div className="relative flex flex-row items-center justify-between w-full p-4">
        <a onClick={() => router.push("/")}>
          {theme === "light" ? (
            <Image
              src="/logo-bg.png"
              alt="logo"
              width={48}
              height={48}
              className="rounded-lg w-9 h-9 md:w-12 md:h-12"
            />
          ) : (
            <Image
              src="/logo.png"
              alt="logo"
              width={48}
              height={48}
              className="rounded-lg w-9 h-9 md:w-12 md:h-12"
            />
          )}
        </a>

        {/* Desktop Menu */}
        <NavigationMenu className="font-bold hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={navigationMenuTriggerStyle()}
                aria-label="Home"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Link href="/work">Work</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  <ListItem key="all" title="Work" href="/work">
                    Browse all of my work
                  </ListItem>
                  {projects.map((project) => (
                    <ListItem
                      key={project.sys.id}
                      title={project.fields.title}
                      href={`/work/${project.fields.slug}`}
                      imageUrl={`https://${project.fields.image.fields.file.url}`}
                    >
                      {project.fields.overview}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className={navigationMenuTriggerStyle()}
                aria-label="About"
              >
                About
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/contact"
                className={navigationMenuTriggerStyle()}
                aria-label="Contact"
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="hidden md:flex"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="flex md:hidden z-50"
          aria-label="Toggle Mobile Sidebar"
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
              aria-label="Home"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Work"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="About"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="p-3 hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Contact"
            >
              Contact
            </Link>
          </nav>

          <div className="mt-auto p-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-full"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <MoonIcon className="mr-2 h-4 w-4" />
              ) : (
                <SunIcon className="mr-2 h-4 w-4" />
              )}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { imageUrl?: string }
>(({ className, title, children, imageUrl, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "flex flex-row select-none gap-2 rounded-md p-1 h-full w-full leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title ?? ""}
              width={128}
              height={128}
              className="rounded-md w-1/5 min-h-full object-cover"
            />
          )}
          {!imageUrl && (
            <div className="rounded-md w-1/5 min-h-full bg-muted flex items-center justify-center">
              <FolderCode />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
