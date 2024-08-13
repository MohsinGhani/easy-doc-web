import React from "react";
import SearchInput from "../SearchInput";
import SortInput from "../SortInput";
import ProfilesFoundCount from "./ProfilesFoundCount";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dot, Heart, MapPin, Star } from "lucide-react";
import { Button } from "../ui/button";

const DoctorsList = () => {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <SearchInput className="flex-1" />
        <SortInput />
      </div>

      <ProfilesFoundCount count={110} text={"Doctors found"} />

      <div className="@4xl:w-full @2xl:w-[90%] w-full mx-auto grid xl:grid-cols-3 @4xl:grid-cols-2 grid-cols-1 gap-6">
        {[0, 1, 2, 3, 4, 5].map((e, i) => (
          <Card key={e + i} className="w-full">
            <CardContent className="p-4 flex flex-col gap-4 items-start w-full">
              <div className="w-full h-56 relative">
                <Image
                  src="https://via.placeholder.com/265x224"
                  width={265}
                  height={224}
                  alt="doctor"
                  className="w-full h-full object-cover rounded-xl"
                />

                <div className="absolute left-2 top-2 px-2 py-1 bg-amber-500 rounded-lg flex items-center gap-1 text-white text-sm font-normal">
                  <Star className="w-4 h-4" /> 4/5
                </div>
                <div className="absolute right-2 top-2 w-7 h-7 bg-stone-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
              </div>

              <div className="flex justify-between items-center w-full">
                <div className="text-neutral-900 text-lg font-semibold tracking-tight flex items-center gap-2">
                  Dr. John{" "}
                  <Image
                    src="/assets/icons/crown.svg"
                    width={22}
                    height={22}
                    alt="crown"
                  />
                </div>

                <Badge
                  variant="outline"
                  className="text-green-600 bg-green-50 space-x-1"
                >
                  <Dot className="w-2 h-2 bg-green-600 rounded-full" />{" "}
                  <span className="text-green-600 text-sm font-normal tracking-tight">
                    Available
                  </span>
                </Badge>
              </div>

              <div className="flex flex-col justify-start items-start gap-1">
                <div className="self-stretch text-primary text-base font-normal leading-snug">
                  Dentist
                </div>
                <div className="text-zinc-600 text-base font-normal leading-snug">
                  05 years experience
                </div>
                <div className="text-zinc-600 text-base font-normal leading-snug flex items-center gap-1">
                  <MapPin className="w-3 h-4" /> Florida, USA
                </div>
              </div>

              <div className="flex items-center gap-3 w-full">
                <Button
                  variant="outline"
                  className="text-sm font-medium w-full"
                >
                  View details
                </Button>
                <Button className="text-sm font-medium w-full">
                  Fee : $400
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
