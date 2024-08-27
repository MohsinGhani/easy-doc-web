"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentRatings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";

interface PatientsReviewsListProps {
  viewAll?: boolean;
  // TODO: hace to make this ratings prop mandatory
  ratings?: Array<{
    name: string;
    city: string;
    country: string;
    message: string;
    avatar: string;
  }>;
}

const defaultRatings = [
  {
    name: "Ashwind",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=ashwind",
  },
  {
    name: "Julie",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=julie",
  },
  {
    name: "Mark",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=mark",
  },
  {
    name: "John",
    city: "London",
    country: "UK",
    message: "Have a nice day and don’t forget to take care of your health!",
    avatar: "https://i.pravatar.cc/150?u=john",
  },
];

const PatientsReviewsList = ({
  viewAll = false,
  ratings = defaultRatings,
}: PatientsReviewsListProps) => {
  return (
    <Card>
      {viewAll && (
        <CardHeader className="">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Patient&apos;s Reviews
            </CardTitle>
            <Link
              className="text-sm font-medium text-primary"
              href="/patients-reviews"
            >
              View All
            </Link>
          </div>
          <Separator />
        </CardHeader>
      )}
      <CardContent className="space-y-4 p-6 w-full">
        {ratings.map((rating, i) => (
          <>
            <div className="flex items-start gap-4 justify-between" key={i}>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={rating.avatar}
                    alt="Avatar"
                    width={50}
                    height={50}
                  />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 sm:gap-0">
                  <h2 className="font-medium sm:text-lg text-base leading-none">
                    {rating.name}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {rating.city}, {rating.country}
                  </p>
                  <p className="sm:text-sm text-xs sm:font-medium font-normal">
                    {rating.message}
                  </p>
                </div>
              </div>
              <CommentRatings
                rating={3}
                totalStars={5}
                size={24}
                variant="yellow"
                disabled={true}
              />
            </div>
            <Separator />
          </>
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientsReviewsList;
