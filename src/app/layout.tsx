import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linkh3",
  description: "Fast and simple URL shortener.",
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
      <body>{children}</body>
    </html>
  );
}
