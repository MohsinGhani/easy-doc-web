"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";

const ManageProfile = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>This will be shared to our platform</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex sm:flex-row flex-col items-center sm:items-start sm:space-x-4 space-y-4 sm:space-y-0 w-full text-center sm:text-left">
            <div className="w-28 h-28 border-2 bg-neutral-50 rounded-2xl border-dashed border-neutral-400 sm:flex items-center justify-center hidden">
              <Image
                src={"/assets/icons/png.svg"}
                width={36}
                height={36}
                alt="image"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center sm:items-start justify-between gap-5 w-full">
              <div className="space-y-1.5">
                <CardTitle>Upload Profile Picture</CardTitle>
                <CardDescription>
                  Your image should be below 4 MB. Accepted formats: jpg, png,
                  svg.
                </CardDescription>
              </div>

              <Image
                src={"/assets/icons/png.svg"}
                width={36}
                height={36}
                alt="image"
                className="w-28 h-28 object-contain border-2 bg-neutral-50 rounded-2xl border-dashed border-neutral-400 sm:hidden"
              />
              <Button className="w-full sm:w-auto">Upload Image</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>This will be shared to our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="display-name">Display name</Label>
              <Input id="display-name" placeholder="Enter your display name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="pl-3 text-left font-normal text-muted-foreground w-full"
                  >
                    Pick a date
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation</Label>
              <Input id="designation" placeholder="Enter your designation" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="Enter your email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact no</Label>
              <Input id="contact" placeholder="Enter your contact no" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Search country" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Search city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="languages">Known Languages</Label>
              <Select>
                <SelectTrigger id="languages">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1 sm:col-span-2 space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                placeholder="Enter Bio"
                className="min-h-[100px]"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ManageProfile;