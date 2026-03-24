import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "WeatherGlass",
  description: "A dark, glassmorphism-styled weather dashboard.",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night-gradient text-night-50 overflow-x-hidden">
        <Navbar />
        <main className="flex-grow flex flex-col w-full">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
