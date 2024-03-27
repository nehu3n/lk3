import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "LK3",
  description: "Fast, easy and free URL shortener.",
  openGraph: {
    type: "website",
    url: "https://lk3.vercel.app",
    title: "LK3 - Url Shortener",
    description: "🔗 Fast, easy and free URL shortener.",
    siteName: "LK3",
  },
  icons: {
    icon: "/shorter-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
