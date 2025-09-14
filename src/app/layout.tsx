import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "English Learning Platform - Master English with Interactive Lessons",
  description: "Comprehensive English learning platform with interactive lessons, quizzes, and progress tracking. Learn grammar, vocabulary, conversation, and pronunciation.",
  keywords: "English learning, online courses, grammar, vocabulary, conversation, pronunciation, interactive lessons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navigation />
          <main>{children}</main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}