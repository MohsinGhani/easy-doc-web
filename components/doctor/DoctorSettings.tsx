"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/layout/content-layout";
import ManageExperiences from "@/components/doctor/ManageExperiences";
import ManageEducation from "@/components/doctor/ManageEducation";
import ManageProfile from "@/components/doctor/ManageProfile";
import ManageAwards from "@/components/doctor/ManageAwards";
import AvailabilitySwitch from "@/components/doctor/AvailabilitySwitch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorSettings() {
  const [activeTab, setActiveTab] = useState("basic-details");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    setActiveTab(searchParams.get("activeTab") || "basic-details");
  }, [searchParams]);

  const navigateToTab = (newActiveTab: string) => {
    // Get the current query parameters
    const currentParams = new URLSearchParams(searchParams);
    // Update the 'activeTab' parameter
    currentParams.set("activeTab", newActiveTab);

    router.replace(`/settings/?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <ContentLayout title="Dashboard">
      <section>
        <div className="flex items-end gap-8 mb-6">
          <h3 className="text-2xl font-semibold">Profile Settings</h3>
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold">Available</span>
            <AvailabilitySwitch />
          </div>
        </div>

        <Tabs defaultValue={activeTab}>
          <TabsList className="md:hidden w-full mb-6 mt-2">
            <Carousel className="w-full max-w-[80%]">
              <CarouselContent className="w-full">
                {["basic-details", "experience", "education", "awards"].map(
                  (value, i) => (
                    <CarouselItem key={i} className="basis-1/4 min-w-[130px]">
                      <TabsTrigger
                        value={value}
                        className="w-full capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        onClick={() => navigateToTab(value)}
                      >
                        {value.split("-").join(" ")}
                      </TabsTrigger>
                    </CarouselItem>
                  )
                )}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </TabsList>

          <TabsList className="hidden md:flex w-full justify-between bg-background mb-6 mt-2">
            {["basic-details", "experience", "education", "awards"].map(
              (value, i) => (
                <TabsTrigger
                  key={i}
                  value={value}
                  className="flex-1 capitalize p-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  onClick={() => navigateToTab(value)}
                >
                  {value.split("-").join(" ")}
                </TabsTrigger>
              )
            )}
          </TabsList>

          <TabsContent value="basic-details">
            <ManageProfile />
          </TabsContent>
          <TabsContent value="experience">
            <ManageExperiences />
          </TabsContent>
          <TabsContent value="education">
            <ManageEducation />
          </TabsContent>
          <TabsContent value="awards">
            <ManageAwards />
          </TabsContent>
        </Tabs>
      </section>
    </ContentLayout>
  );
}
