import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import type { Metadata } from "next";
import "./globals.css";
import { LoadingContext } from "@/components/Loading";

export const metadata: Metadata = {
  title: "Share projects",
  description: "Share your projects with other people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <LoadingContext>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </LoadingContext>
      </body>
    </html>
  );
}
