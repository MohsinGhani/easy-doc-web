import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider"; // Theme management
import { Toaster } from "@/components/ui/sonner"; // Notification component
import { Navbar } from "@/components/navbar/Navbar"; // Importing the Navbar component from the specified path

import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider"; // Redux store provider

// Import the Google Font Inter with the variable for CSS custom property
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Metadata for the Next.js app
export const metadata: Metadata = {
  title: "Easy Doc",
  description: "Easy Doc | An online appointment booking platform",
};

// Root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // HTML structure
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* Theme provider */}
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <ThemeProvider attribute="class" defaultTheme="light">
          {/* Redux store provider */}
          <StoreProvider>
            {/* Navbar */}
            <Navbar />
            {/* Content */}
            {children}

            {/* Notification component */}
            <Toaster
              position="top-center"
              icons={{
                success: "✅",
                error: "❌",
                info: "📝",
                warning: "⚠️",
                loading: "⏳",
              }}
              closeButton={true}
            />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
