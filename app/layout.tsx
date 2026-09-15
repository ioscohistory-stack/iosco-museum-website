import type { Metadata } from "next";
import "./globals.css";
import { VisitorTracker } from "./visitor-tracker";

export const metadata: Metadata = {
  title: {
    default: "Iosco County Historical Society",
    template: "%s | Iosco County Historical Society",
  },
  description:
    "Explore the museum, archives, and community histories of Iosco County, Michigan.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<VisitorTracker /></body>
    </html>
  );
}
