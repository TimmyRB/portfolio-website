import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/footer";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Jacob Brasil",
  description:
    "Jacob Brasil's Portfolio Website featuring a collection of projects I've worked on",
  manifest: "/manifest.json",
  metadataBase: new URL("https://jacobbrasil.com"),
  alternates: {
    canonical: "https://jacobbrasil.com",
  },
  openGraph: {
    title: "Jacob Brasil",
    description:
      "Jacob Brasil's Portfolio Website featuring a collection of projects I've worked on",
    siteName: "Jacob Brasil",
    url: "https://jacobbrasil.com",
    type: "website",
    locale: "en_US",
    images: [{ url: "https://jacobbrasil.com/logo-bg.png" }],
  },
  icons: [
    { rel: "apple-touch-icon", sizes: "57x57", url: "/apple-icon-57x57.png" },
    { rel: "apple-touch-icon", sizes: "60x60", url: "/apple-icon-60x60.png" },
    { rel: "apple-touch-icon", sizes: "72x72", url: "/apple-icon-72x72.png" },
    { rel: "apple-touch-icon", sizes: "76x76", url: "/apple-icon-76x76.png" },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      url: "/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      url: "/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      url: "/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      url: "/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/android-icon-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/favicon-96x96.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen w-screen overflow-x-hidden overflow-y-auto">
        <SpeedInsights />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex flex-col flex-1 p-4">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-W9DDJJTE4L" />
    </html>
  );
}
