"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import ThankYouDialog from "./ThankYouDialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { doctorThunks } from "@/lib/features/doctor/doctorThunks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, reviewSchemaType } from "@/models/validationSchemas";
import { Form, FormControl } from "@/components/ui/form";
import { CustomFormField } from "@/components/auth";
import { FormFieldType } from "@/components/auth/CustomFormField";

const LeaveReviewDialog: React.FC<{ doctorId: string }> = ({ doctorId }) => {
  const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { userId, given_name, family_name, picture, city, country } =
    useAppSelector((state) => state.auth.user);

  const form = useForm<reviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      first_name: given_name,
      last_name: family_name,
      rating: 3,
      comment: "",
    },
  });

  const onSubmit = async (data: reviewSchemaType) => {
    const { first_name, last_name, rating, comment } = data;

    const reviewData: Review = {
      name: `${first_name} ${last_name}`,
      patientId: userId,
      doctorId,
      rating: rating as RatingNumber,
      comment: comment || "",
      picture:
        picture ||
        `https://avatar.iran.liara.run/public/${Math.floor(
          Math.random() * 100
        )}`,
      city: city || "",
      country: country || "",
      createdAt: "",
      reviewId: "",
    };

    const res = await dispatch(doctorThunks.submitDoctorReview({ reviewData }));

    if (res.type === "fulfilled") {
      setIsReviewSubmitted(true);
    }
  };

  const { control, handleSubmit } = form;
  // TODO: add here a success dialog
  // console.log("isReviewSubmitted", isReviewSubmitted);

  return (
    <>
      {/* Dialog for leaving a review */}
      <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Leave a Review
        </DialogTrigger>

        <DialogContent className="max-h-[90vh] border max-w-3xl lg:w-full rounded-xl overflow-y-auto">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Leave a Review For Dr. John</DialogTitle>
              </DialogHeader>

              {/* Review form content */}
              <div className="p-6">
                {/* rating */}
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={control}
                  name="rating"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <StarIcon
                            key={value}
                            onClick={() => {
                              field.onChange(value);
                            }}
                            className={`w-10 h-10 cursor-pointer ${
                              value <= field.value
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </FormControl>
                  )}
                />

                {/* comment */}
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={control}
                  name="comment"
                  label="Write a review"
                  placeholder="Write a review..."
                />

                {/* first_name */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="first_name"
                  label="First Name"
                  placeholder="Enter your first name"
                />

                {/* last_name */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Enter your last name"
                />
              </div>

              {/* Footer buttons */}
              <DialogFooter>
                <DialogClose
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Cancel
                </DialogClose>
                <Button
                  className={cn(buttonVariants({ variant: "default" }))}
                  type="submit"
                >
                  Submit Review
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog for thank you message */}
      {isReviewSubmitted && <ThankYouDialog />}
    </>
  );
};

export default LeaveReviewDialog;
