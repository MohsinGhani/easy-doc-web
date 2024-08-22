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
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CardContent } from "../ui/card";

const AddExperienceDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Experience
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] border max-w-3xl lg:w-full w-[300px] rounded-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Experience</DialogTitle>
          <DialogDescription>Enter details below</DialogDescription>
          <CardContent className="px-0 text-start">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`title`}>Title</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`hospital`}>Hospital Name</Label>
                <Input />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`employment`}>Employment</Label>
                <Select>
                  <SelectTrigger id={`employment`}>
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">Fulltime</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 space-y-2 my-6">
              <Label htmlFor={`description`}>Description</Label>
              <Textarea id={`description`} rows={7} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`start-date`}>Start Date</Label>
                <Input id={`start-date`} type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date`}>End Date</Label>
                <Input id={`end-date`} type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`city`}>City</Label>
                <Select>
                  <SelectTrigger id={`city`}>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="karachi">Karachi</SelectItem>
                    <SelectItem value="lahore">Lahore</SelectItem>
                    <SelectItem value="islamabad">Islamabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id={`current`} />
                  <Label
                    htmlFor={`current`}
                    className="text-sm font-medium leading-none"
                  >
                    I currently work here
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </DialogClose>
          <DialogClose className={cn(buttonVariants({ variant: "default" }))}>
            Add Experience
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExperienceDialog;
