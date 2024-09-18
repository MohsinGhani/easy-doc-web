"use client";

import * as React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentRatings } from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/lib/hooks";

interface PatientsReviewsListProps {
  viewAll?: boolean;
}

const PatientsReviewsList = ({ viewAll = false }: PatientsReviewsListProps) => {
  const {
    user: { reviews },
    loading,
  } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ PatientsReviewsList ~ reviews?:", reviews);

  return (
    <Card>
      {viewAll && (
        <>
          <CardHeader className="pb-4">
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
          </CardHeader>
          <Separator />
        </>
      )}

      <CardContent className="space-y-4 p-6 w-full">
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <span>Loading...</span>
          </div>
        ) : reviews?.length > 0 ? (
          reviews?.map((review, i) => (
            <React.Fragment key={i}>
              <div className="flex items-start gap-4 justify-between">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage
                      src={review.picture}
                      alt="Avatar"
                      width={50}
                      height={50}
                    />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 sm:gap-0">
                    <h2 className="font-medium sm:text-lg text-base leading-none">
                      {review.name}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {review.city}, {review.country}
                    </p>
                    <p className="sm:text-sm text-xs sm:font-medium font-normal">
                      {review.comment}
                    </p>
                  </div>
                </div>
                <CommentRatings
                  rating={review.rating}
                  totalStars={5}
                  size={24}
                  variant="yellow"
                  disabled={true}
                />
              </div>
              {i !== reviews?.length - 1 && <Separator />}
            </React.Fragment>
          ))
        ) : (
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            No reviews? for you till now.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatientsReviewsList;
