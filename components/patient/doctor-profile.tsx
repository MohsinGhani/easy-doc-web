"use client";

import { Star, Share2, Heart, MapPin, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect } from "react";
import TimelineComponent from "../timelines/TimelineComponent";
import AvailableTimings from "./AvailableTimings";
import PatientReviews from "./review/PatientReviews";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import { cn, getCityNameById, getCountryNameByCode } from "@/lib/utils";
import EmptyState from "../common/EmptyState";
import Link from "next/link";

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
  const dispatch = useAppDispatch();
  const { loading, fetchedDoctor: doctor } = useAppSelector(
    (state) => state.doctor
  );

  useEffect(() => {
    if (doctorId && typeof doctorId === "string") {
      dispatch(doctorThunks.fetchDoctorById(doctorId));
    }
  }, [dispatch, doctorId]);

  if (loading) return <Loader />;
  if (!doctor) return <EmptyState />;

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
            {/* Image Section */}
            <div className="hidden lg:block relative w-72 h-auto flex-shrink-0">
              <div className="h-full flex">
                <Image
                  src={doctor?.picture}
                  alt={doctor?.display_name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-md text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1 fill-current" />
                4/5
              </div>
              <button className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Content Section */}
            <div className="flex-1 space-y-4">
              <div className="w-full flex flex-col items-center justify-center lg:hidden">
                <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0 md:mr-6">
                  <AvatarImage
                    src={doctor?.picture}
                    alt={doctor?.display_name}
                    className="w-full h-full object-cover rounded-full object-top" // Ensure proper fit and aspect ratio
                  />
                  <AvatarFallback>
                    {doctor.given_name.charAt(0) + doctor.family_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{doctor?.display_name}</h2>
                <p className="text-primary">{doctor.designation}</p>
              </div>

              <Badge
                variant={!doctor?.available ? "secondary" : "success"}
                className="lg:inline-flex hidden"
              >
                <span className="mr-1 text-lg leading-none font-bold">•</span>
                {!doctor.available ? "Unavailable" : "Available"}
              </Badge>

              <div className="lg:block hidden">
                <h2 className="text-2xl font-bold">{doctor?.display_name}</h2>
                <p className="text-primary">{doctor.designation}</p>
              </div>

              <div className="flex items-center gap-2 text-sm sm:text-base text-zinc-600 font-normal leading-snug">
                <p>{doctor?.years_of_experience || 0} years experience</p>
                <Separator
                  orientation="vertical"
                  className="h-4 w-px bg-[#e2e8f0]"
                />
                <div className="flex gap-1 items-center">
                  <MapPin className="w-4 h-4" />
                  <p>
                    {getCityNameById(doctor?.city) +
                      " " +
                      getCountryNameByCode(doctor?.country)}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold mb-2">Known Languages</h3>
                <div className="flex space-x-2">
                  {doctor?.languages?.map((lang) => (
                    <Badge key={lang} className="capitalize">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Bio</h3>
                <p className="text-sm text-muted-foreground">{doctor?.bio}</p>
              </div>

              <Separator />

              <div className="flex md:items-center justify-between gap-2 lg:flex-wrap md:flex-row flex-col">
                <div className="flex items-center sm:justify-center justify-between sm:w-fit w-full  gap-6 mb-4 md:mb-0">
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
                        {doctor?.awards?.length}+
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center lg:gap-6 gap-3 w-auto flex-wrap">
                  <p className="flex items-center gap-2 tracking-tight font-bold sm:font-semibold lg:text-2xl sm:text-lg text-sm">
                    Fee : $240{" "}
                    <span className="text-base font-normal text-zinc-600">
                      per session
                    </span>
                  </p>
                  <Link
                    href={`/doctors/${doctorId}/book-appointment`}
                    className={cn(
                      "w-full sm:w-auto",
                      buttonVariants({ size: "xl", variant: "default" })
                    )}
                  >
                    Book as appointment
                  </Link>
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
              <Carousel className="w-full max-w-[80%]">
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
                <CarouselPrevious />
                <CarouselNext />
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
                    heading="Practical Experiences"
                    elements={doctor?.experiences ?? []}
                    dateKey={["start_date", "end_date"]}
                    descriptionKey="description"
                    locationKey={["city", "country"]}
                    titleKey="title"
                    subTitleKeys={["hospital_name", "employment_type"]}
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
                    elements={doctor?.education ?? []}
                    heading="Educational Details:"
                    dateKey={["start_date", "end_date"]}
                  />
                )}
                {tab.value === "awards" && (
                  <TimelineComponent
                    heading="Practical Experiences:"
                    elements={doctor?.awards ?? []}
                    dateKey="year"
                    descriptionKey="description"
                    locationKey="city"
                    titleKey="award_name"
                    subTitleKeys={"institute"}
                    separators={{ locationKey: ", " }}
                  />
                )}
                {tab.value === "available-slots" && (
                  <AvailableTimings
                    availableDays={doctor?.availableDays ?? []}
                  />
                )}
                {tab.value === "reviews" && (
                  <PatientReviews
                    reviews={doctor?.reviews ?? []}
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
