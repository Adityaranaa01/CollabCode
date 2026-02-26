import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CollabCode | Code together without limits.",
  description:
    "The real-time collaborative workspace designed for high-performance engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  );
}
