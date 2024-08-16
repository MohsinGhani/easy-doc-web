import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar/Navbar";

import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Easy Doc",
  description: "Easy Doc | An online appointment booking platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <ThemeProvider attribute="class" defaultTheme="light">
          <StoreProvider>
            <Navbar />
            {children}

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
