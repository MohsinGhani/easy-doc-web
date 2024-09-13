"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ContentLayout } from "@/components/layout/content-layout";
import ManageExperiences from "@/components/doctor/ManageExperiences";
import ManageEducation from "@/components/doctor/ManageEducation";
import ManageProfile from "@/components/doctor/ManageProfile";
import ManageAwards from "@/components/doctor/ManageAwards";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import AvailabilitySwitch from "@/components/doctor/AvailabilitySwitch";

export default function DoctorProfilePage() {
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

        <Tabs defaultValue="basic-details">
          <TabsList
            className="mb-6 mt-2 w-full hidden md:inline-flex"
            defaultValue="basic-details"
          >
            {["basic-details", "experience", "education", "awards"].map(
              (value, i) => (
                <TabsTrigger
                  value={value}
                  className="flex-1 capitalize p-1"
                  key={i}
                >
                  {value}
                </TabsTrigger>
              )
            )}
          </TabsList>

          <TabsList
            className="mb-6 mt-2 w-full md:hidden"
            defaultValue="basic-details"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full px-2 py-2">
                Select <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="!w-full">
                {["basic-details", "experience", "education", "awards"].map(
                  (value, i) => (
                    <DropdownMenuItem key={i} className="!w-full">
                      <TabsTrigger
                        value={value}
                        className="flex-1 capitalize p-1"
                      >
                        {value.split("-").join(" ")}
                      </TabsTrigger>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
