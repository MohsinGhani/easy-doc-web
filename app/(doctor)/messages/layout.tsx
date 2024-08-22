"use client";

import { ContentLayout } from "@/components/layout/content-layout";
import MssagesSidebar from "@/components/messages/messages-sidebar";
import { Card, CardContent } from "@/components/ui/card";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ContentLayout title="Dashboard | Messages">
      <h2 className="text-2xl font-medium mb-5">Messages</h2>

      <main className="flex gap-6 lg:gap-4 lg:flex-row flex-col min-h-screen">
        <MssagesSidebar />

        <Card className="md:w-[70%] w-full">
          <CardContent className="flex flex-col gap-6 p-6 w-full relative h-full">
            {children}
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  );
}
