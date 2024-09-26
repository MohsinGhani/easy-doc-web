"use client";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { StarIcon } from "lucide-react"; // Assuming you're using lucide-react for the star icon
import { cn } from "@/lib/utils";

const ThankYouDialog = () => {
  return (
    <Dialog defaultOpen>
      <DialogContent className="max-h-[90vh] border max-w-md lg:w-full rounded-xl overflow-y-auto text-center p-6">
        <DialogHeader>
          {/* Large Star Icon */}
          <div className="flex justify-center mb-4">
            <StarIcon className="w-20 h-20 text-yellow-500" />
          </div>
        </DialogHeader>

        {/* Thank You Message */}
        <p className="text-xl font-semibold mb-4">
          Thank you for submitting your review!
        </p>

        {/* Confirmation Button */}
        <DialogClose
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          Okay
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouDialog;
