import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import StoreProvider from "@/lib/StoreProvider";
import WebSocketInitializer from "@/lib/webSocketInitializer";
import React from "react";
import { Analytics } from "@vercel/analytics/react";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--outfit",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Easy Doc",
  description: "Easy Doc | An online appointment booking platform",
  authors: [
    {
      name: "Aasil Ghoury",
      url: "https://lalaghoury.github.io/aasil-portfolio",
    },
    { name: "Inciter Tech", url: "https://incitertech.com" },
  ],
  applicationName: "Easy Doc",
  abstract:
    "Easy Doc is an online appointment booking, consulting platform for doctors and patients. Patients can book, manage their appointments and can track their payment history.",
  assets: "/public/assets",
  category: "Healthcare",
  creator: "Aasil Ghoury",
  generator: "Next.js",
  publisher: "Vercel",
  openGraph: {
    type: "website",
    url: "https://easy-doc-web-silk.vercel.app",
    title: "Easy Doc",
    description:
      "Easy Doc is an online appointment booking, consulting platform for doctors and patients. Patients can book, manage their appointments and can track their payment history.",
    siteName: "Easy Doc",
    images: [
      {
        url: "/public/assets/images/easy-doc.png",
      },
    ],
  },
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
        <StoreProvider>
          {children}
          <Analytics />

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

          <WebSocketInitializer />
        </StoreProvider>
      </body>
    </html>
  );
}
