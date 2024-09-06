"use client";

import { Star, Share2, Heart, MapPin, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import apiClient from "@/helpers/apiClient";
import TimelineComponent from "./timelines/TimelineComponent";
import AvailableTimings from "./patient/AvailableTimings";
import PatientReviews from "./patient/review/PatientReviews";

const tabs = [
  { value: "experience", label: "Experience" },
  { value: "education", label: "Education" },
  { value: "awards", label: "Awards" },
  { value: "available-slots", label: "Available Slots" },
  { value: "reviews", label: "Reviews" },
];

interface DoctorProfileProps {
  doctorId: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ doctorId }) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  console.log("🚀 ~ doctor:", doctor);

  useEffect(() => {
    const fetchDoctor = async () => {
      const response = await apiClient.get(`/doctor/${doctorId}`);
      setDoctor(response.data.data);
    };

    fetchDoctor();
  }, [doctorId]);

  if (!doctor) return null;

  return (
    <div className="flex flex-col space-y-8">
      <Card className="w-full">
        <CardHeader className="flex-row lg:justify-start justify-between lg:items-end p-6">
          <Badge variant={"success"} className="lg:hidden inline-flex">
            <span className="mr-1 text-lg leading-none font-bold">•</span>
            Available
          </Badge>

          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="hidden lg:block relative max-w-96 w-full max-h-[600px]">
              <Image
                src={doctor.profile_image}
                alt={doctor.display_name}
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                4/5
              </div>
              <button className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="w-full flex flex-col items-center justify-center lg:hidden">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 md:mb-0 md:mr-6">
                  <AvatarImage
                    src={doctor.profile_image}
                    alt={doctor.display_name}
                  />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>

                {/* <Badge variant={"success"}>
                <span className="mr-1 text-lg leading-none font-bold">•</span>
                Available
              </Badge> */}

                <h2 className="text-2xl font-bold">{doctor.display_name}</h2>
              </div>

              <Badge variant={"success"} className="lg:inline-flex hidden">
                <span className="mr-1 text-lg leading-none font-bold">•</span>
                Available
              </Badge>

              <div className="lg:block hidden">
                <h2 className="text-2xl font-bold">{doctor.display_name}</h2>
                <p className="text-primary">Dentist</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base text-zinc-600 font-normal leading-snug">
                <p className="">
                  {doctor.years_of_experience} years experience
                </p>
                <Separator
                  orientation="vertical"
                  className="h-4 w-px bg-[#e2e8f0]"
                />
                <div className="flex gap-1 items-center">
                  <MapPin className="w-4 h-4" />
                  <p className="">{doctor.city + " " + doctor.country}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Known Languages</h3>
                <div className="flex space-x-2">
                  <Badge>Urdu</Badge>
                  <Badge>English</Badge>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{doctor.bio}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div className="mr-4">
                    <p className="text-sm text-muted-foreground">
                      Satisfied Patients
                    </p>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-1 text-blue-400" />
                      <p className="lg:text-base text-sm font-bold sm:font-semibold">
                        200+
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Awards
                    </p>
                    <div className="flex items-center">
                      <Award className="w-5 h-5 mr-1 text-green-400" />
                      <p className="lg:text-base text-sm font-bold sm:font-semibold">
                        {doctor.awards.length}+
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center lg:gap-6 gap-3 w-full lg:w-auto flex-wrap">
                  <p className="flex items-center gap-2 tracking-tight font-bold sm:font-semibold lg:text-2xl sm:text-lg text-sm">
                    Fee : $240{" "}
                    <span className="text-base font-normal text-zinc-600">
                      per session
                    </span>
                  </p>
                  <Button className="w-full sm:w-auto" size={"xl"}>
                    Book an appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <Tabs defaultValue="experience" className="w-full">
          <CardContent>
            <TabsList className="md:hidden w-full">
              <Carousel className="w-full">
                <CarouselContent className="w-full">
                  {tabs.map((tab) => (
                    <CarouselItem
                      key={tab.value}
                      className="basis-1/4 min-w-[130px] max-w-[130px]"
                    >
                      <TabsTrigger
                        value={tab.value}
                        className="w-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        {tab.label}
                      </TabsTrigger>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </TabsList>

            <TabsList className="hidden md:flex justify-between w-full bg-background">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.value === "experience" && (
                  <TimelineComponent
                    heading="Practical Experiences:"
                    elements={doctor.experiences}
                    dateKey="time_period"
                    descriptionKey="description"
                    locationKey={["city", "country"]}
                    titleKey="title"
                    subTitleKeys={["hospital_name", "employment_type"]} //TODO: add the employment_type insted of employment
                    separators={{ locationKey: ", ", subTitleKeys: " - " }}
                  />
                )}
                {tab.value === "education" && (
                  <TimelineComponent
                    titleKey="institute"
                    subTitleKeys={["degree_name", "field"]}
                    locationKey={["city", "country"]}
                    separators={{ locationKey: ", ", subTitleKeys: " - " }}
                    descriptionKey="description"
                    elements={doctor.education}
                    heading="Educational Details:"
                    dateKey="time_period"
                  />
                )}
                {tab.value === "awards" && (
                  <TimelineComponent
                    heading="Practical Experiences:"
                    elements={doctor.awards}
                    dateKey="year"
                    descriptionKey="description"
                    locationKey="city"
                    titleKey="award_name"
                    subTitleKeys={"institute"}
                    separators={{ locationKey: ", " }}
                  />
                )}
                {tab.value === "available-slots" && (
                  <AvailableTimings availableDays={doctor.availableDays} />
                )}
                {tab.value === "reviews" && (
                  <PatientReviews
                    reviews={doctor.reviews}
                    doctorId={doctorId}
                  />
                )}
              </TabsContent>
            ))}
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DoctorProfile;
