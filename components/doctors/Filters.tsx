"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { CalendarIcon } from "lucide-react";
import { DualRangeSlider } from "../ui/DualRangeSlider";

export default function Filters() {
  const [price, setPrice] = useState([100, 200]);
  const [experience, setExperience] = useState([0, 20]);

  return (
    <Card className="w-full max-w-[272px]">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
        <CardDescription>
          <div className="w-16 h-1 relative">
            <div className="w-11 h-1 left-0 top-0 absolute bg-blue-500 rounded-3xl" />
            <div className="w-2.5 h-1 left-[44px] top-0 absolute bg-blue-500 rounded-3xl" />
            <div className="w-1.5 h-1 left-[55px] top-0 absolute bg-blue-500 rounded-3xl" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center space-x-2">
          <Checkbox id="available" />
          <Label htmlFor="available">Available</Label>
        </div>

        <div className="space-y-4">
          <Label>Fee</Label>

          <DualRangeSlider
            label={(value) => <span>${value}</span>}
            labelPosition="bottom"
            value={price}
            onValueChange={setPrice}
            min={20}
            max={200}
            step={10}
          />
        </div>

        <div className="space-y-4">
          <Label>Experience</Label>

          <DualRangeSlider
            label={(value) => <span>{value}yrs</span>}
            labelPosition="bottom"
            value={experience}
            onValueChange={setExperience}
            min={1}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Select date</Label>

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
              <Calendar
                mode="single"
                disabled={{
                  before: new Date(),
                  after: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="speciality">Speciality</Label>
          <Select>
            <SelectTrigger id="speciality" aria-label="Speciality">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="speciality1">Speciality 1</SelectItem>
              <SelectItem value="speciality2">Speciality 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select>
            <SelectTrigger id="city" aria-label="City">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="city1">City 1</SelectItem>
              <SelectItem value="city2">City 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Known Languages</Label>
          <Select>
            <SelectTrigger id="languages" aria-label="Known Languages">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="german">German</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-between">
        <Button size={"lg"} variant="outline" className="w-full">
          Clear Filters
        </Button>
        <Button size={"lg"} className="w-full">
          Apply Filters
        </Button>
      </CardFooter>
    </Card>
  );
}
