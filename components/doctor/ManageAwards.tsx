"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import AddExperienceDialog from "./AddExperienceDialog";
import { Trash2 } from "lucide-react";
import DeleteDialog from "../DeleteDialog";
import { Separator } from "../ui/separator";

export default function ManageAwards() {
  const [awards, setAwards] = useState([
    {
      id: 1,
      icon: "https://i.pravatar.cc/40?u=hospital",
      awardName: "Best Surgeon",
      hospital: "Aga Khan Hospital",
      startDate: "2014",
      endDate: "2018",
      currentlyWorking: false,
      description: "",
    },
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
          <CardTitle className="text-2xl sm:text-md">Awards Details</CardTitle>
          <AddExperienceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {awards.map((award, index) => (
            <AccordionItem value={`item-${index}`} key={award.id}>
              <AccordionTrigger
                className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                DeleteIcon={
                  <>
                    <DeleteDialog
                      trigger={
                        <Trash2 className="h-4 w-4 shrink-0 text-destructive ml-4" />
                      }
                      text="Your award will be deleted"
                      onReject={() => {
                        // do nothing till now
                        console.log("rejected");
                      }}
                    />
                  </>
                }
              >
                <div className="flex flex-col items-start w-full">
                  <h3 className="font-semibold text-left">
                    {award.awardName} at {award.hospital}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {award.startDate} - {award.endDate}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`awardName-${award.id}`}>Award name</Label>
                    <Input
                      id={`awardName-${award.id}`}
                      value={award.awardName}
                      onChange={(e) => {
                        const newAward = awards.map((ex) =>
                          ex.id === award.id
                            ? { ...ex, awardName: e.target.value }
                            : ex
                        );
                        setAwards(newAward);
                      }}
                      className="px-3"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`hospital-${award.id}`}>
                      Hospital Name
                    </Label>
                    <Input
                      id={`hospital-${award.id}`}
                      value={award.hospital}
                      onChange={(e) => {
                        const newAward = awards.map((ex) =>
                          ex.id === award.id
                            ? { ...ex, hospital: e.target.value }
                            : ex
                        );
                        setAwards(newAward);
                      }}
                      className="px-3"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`start-date-${award.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${award.id}`}
                      type="date"
                      value={award.startDate}
                      onChange={(e) => {
                        const newAward = awards.map((ex) =>
                          ex.id === award.id
                            ? { ...ex, startDate: e.target.value }
                            : ex
                        );
                        setAwards(newAward);
                      }}
                      className="px-3"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`end-date-${award.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${award.id}`}
                      type="date"
                      value={award.endDate}
                      onChange={(e) => {
                        const newAward = awards.map((ex) =>
                          ex.id === award.id
                            ? { ...ex, endDate: e.target.value }
                            : ex
                        );
                        setAwards(newAward);
                      }}
                      className="px-3"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${award.id}`}
                      checked={award.currentlyWorking}
                      onCheckedChange={(checked) => {
                        const newAward = awards.map((ex) =>
                          ex.id === award.id
                            ? { ...ex, currentlyWorking: !!checked }
                            : ex
                        );
                        setAwards(newAward);
                      }}
                    />
                    <label
                      htmlFor={`current-${award.id}`}
                      className="text-sm font-medium leading-none"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor={`description-${award.id}`}>Description</Label>
                  <Textarea
                    id={`description-${award.id}`}
                    value={award.description}
                    rows={5}
                    onChange={(e) => {
                      const newAward = awards.map((ex) =>
                        ex.id === award.id
                          ? { ...ex, description: e.target.value }
                          : ex
                      );
                      setAwards(newAward);
                    }}
                    className="px-3"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-blue-500 text-white">Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
