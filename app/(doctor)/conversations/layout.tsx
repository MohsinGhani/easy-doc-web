"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import MssagesSidebar from "@/components/conversations/conversations-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ContentLayout
      title="Dashboard | Messages"
      className="pb-2 h-full max-h-[calc(100vh-56px-32px-20px-24px-24px)] min-h-[calc(100vh-20px-24px-12px)] flex flex-col"
    >
      <h2 className="text-2xl font-medium mb-5">Messages</h2>

      <main className="grid lg:grid-cols-3 grid-cols-1 gap-6 h-full grow">
        {!isMobile && <MssagesSidebar />}

        <Card className="lg:col-span-2 w-full h-full">
          <CardContent className="p-0 relative w-full h-full">
            {children}
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  );
}
