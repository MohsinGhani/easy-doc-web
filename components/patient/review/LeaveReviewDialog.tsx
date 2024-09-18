"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import ThankYouDialog from "./ThankYouDialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toast } from "sonner";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";

const LeaveReviewDialog: React.FC<{ doctorId: string }> = ({ doctorId }) => {
  const [rating, setRating] = useState(0);
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { userId, given_name, family_name, picture, city, country } =
    useAppSelector((state) => state.auth.user);
  const [comment, setComment] = useState("");
  const [first_name, setFirst_name] = useState(given_name);
  const [last_name, setLast_name] = useState(family_name);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmitReview = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewData = {
      name: `${first_name} ${last_name}`,
      patientId: userId,
      doctorId,
      rating,
      comment,
      picture:
        picture ||
        `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 100
        )}`,
      city: city || "Unknown",
      country: country || "Unknown",
    };

    try {
      await dispatch(doctorThunks.submitDoctorReview({ reviewData }));
      setIsReviewSubmitted(true);
    } catch (error) {
      toast.error("Error Submitting Review");
    } finally {
      setComment("");
      setRating(1);
    }
  };

  return (
    <>
      {/* Dialog for leaving a review */}
      <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Leave a Review
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] border max-w-3xl lg:w-full rounded-xl overflow-y-auto">
          <form onSubmit={handleSubmitReview}>
            <DialogHeader>
              <DialogTitle>Leave a Review For Dr. John</DialogTitle>
            </DialogHeader>

            {/* Review form content */}
            <div className="p-6">
              <Label className="text-center block mb-4">
                How would you rate Dr. John?
              </Label>

              {/* Star Rating System */}
              <div className="flex justify-center mb-6">
                {[1, 2, 3, 4, 5].map((value) => (
                  <StarIcon
                    key={value}
                    onClick={() => handleRatingClick(value)}
                    className={`w-10 h-10 cursor-pointer ${
                      value <= rating ? "text-yellow-500" : "text-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Review textarea */}
              <div className="space-y-2 mb-6">
                <Label htmlFor="review">Write a review</Label>
                <Textarea
                  id="review"
                  placeholder="Write a review..."
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* First name input */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={first_name}
                  onChange={(e) => setFirst_name(e.target.value)}
                />
              </div>

              {/* Last name input */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={(e) => setLast_name(e.target.value)}
                />
              </div>
            </div>

            {/* Footer buttons */}
            <DialogFooter>
              <DialogClose
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </DialogClose>
              <DialogClose
                className={cn(buttonVariants({ variant: "default" }))}
                type="submit"
              >
                Submit Review
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for thank you message */}
      {isReviewSubmitted && <ThankYouDialog />}
    </>
  );
};

export default LeaveReviewDialog;
