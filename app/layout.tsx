import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Easy Doc",
  description: "Easy Doc | An online appointment booking platform",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          outfit.variable
        )}
      >
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
        <ThemeProvider attribute="class" defaultTheme="light">
          <StoreProvider>
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
