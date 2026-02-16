import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Scorer - AI-Powered Resume Analysis",
  description: "Get instant feedback on your resume with AI-powered analysis. Improve your chances of landing your dream job.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
