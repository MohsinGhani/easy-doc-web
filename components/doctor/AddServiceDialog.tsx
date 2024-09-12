"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";
import { SelectWithSearch } from "../SelectWithSearch";

const AddServiceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Service
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] border max-w-3xl lg:w-full rounded-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogDescription>Enter the service details below</DialogDescription>
          <CardContent className="px-0 text-start">
            {/* Responsive grid for Speciality, Service, and Price */}
            <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor={`speciality`}>Speciality</Label>
                <SelectWithSearch
                  items={[]}
                  placeholder="Select Speciality"
                  onChange={() => {
                    console.log("selected Speciality");
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`service`}>Service</Label>
                <SelectWithSearch
                  items={[]}
                  placeholder="Select Service"
                  onChange={() => {
                    console.log("selected Service");
                  }}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`price`}>Price</Label>
                <Input placeholder="0.00" />
              </div>
            </div>

            <div className="mt-4 space-y-2 my-6">
              <Label htmlFor={`description`}>Description</Label>
              <Textarea id={`description`} rows={7} />
            </div>
          </CardContent>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogClose>
          <DialogClose className={cn(buttonVariants({ variant: "default" }))}>
            Add Service
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
