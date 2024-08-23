"use client";

import React, { useState } from "react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function FiltersSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [fee, setFee] = useState([10, 1000]);
  const [experience, setExperience] = useState([1, 30]);

  return (
    <Card className="w-full lg:max-w-80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 lg:pb-2 lg:p-6 p-0">
        <CardTitle className="text-2xl font-bold lg:block hidden">
          Filters
        </CardTitle>
        <Button
          variant="ghost"
          size={"xl"}
          className="lg:hidden flex items-center justify-between w-full px-3"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-2xl font-bold lg:hidden block">Filters</h3>

          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent
        className={`space-y-6 ${isOpen ? "block" : "hidden lg:block"}`}
      >
        <div className="flex gap-2 items-center">
          <Input id="available" type="checkbox" className="w-4 h-4" />
          <Label htmlFor="available">Available</Label>
        </div>

        <div className="space-y-2">
          <Label>Fee</Label>
          <div className="flex items-center space-x-2">
            <DualRangeSlider
              label={(value) => <span className="mb-1">{value}</span>}
              labelPosition="bottom"
              min={10}
              max={1000}
              step={10}
              value={fee}
              onValueChange={setFee}
              className="flex-grow"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Experience</Label>
          <div className="flex items-center space-x-2">
            <DualRangeSlider
              label={(value) => <span className="mb-1">{value}</span>}
              labelPosition="bottom"
              min={1}
              max={30}
              step={1}
              value={experience}
              onValueChange={setExperience}
              className="flex-grow"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Select availability time</Label>
          <Input id="date" type="date" className="w-full" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialty">Specialty</Label>
          <Select>
            <SelectTrigger id="specialty">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
              <SelectItem value="option3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select>
            <SelectTrigger id="city">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="city1">City 1</SelectItem>
              <SelectItem value="city2">City 2</SelectItem>
              <SelectItem value="city3">City 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="languages">Known Languages</Label>
          <Select>
            <SelectTrigger id="languages">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lang1">Language 1</SelectItem>
              <SelectItem value="lang2">Language 2</SelectItem>
              <SelectItem value="lang3">Language 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4 pt-4">
          <Button variant="outline" className="w-full">
            Clear Filters
          </Button>
          <Button className="w-full">Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
