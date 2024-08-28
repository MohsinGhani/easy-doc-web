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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function ManageExperiences() {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      hospitalName: "Aga Khan Hospital",
      startDate: "2015",
      endDate: "2018",
      title: "Surgeon",
      city: "Karachi",
      employment: "Fulltime",
      currentlyWorking: false,
      description: "",
      icon: "https://i.pravatar.cc/40?u=hospital",
    },
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex sm:flex-row flex-col gap-4 justify-between items-center">
          <CardTitle className="text-2xl sm:text-md">
            Practice Experience
          </CardTitle>
          <AddExperienceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {experiences.map((exp, index) => (
            <AccordionItem value={`item-${index}`} key={exp.id}>
              <AccordionTrigger
                className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                DeleteIcon={
                  <>
                    <DeleteDialog
                      trigger={
                        <Trash2 className="h-4 w-4 shrink-0 text-destructive" />
                      }
                      text="Your experience will be deleted"
                      onReject={() => {
                        // do nothing
                        console.log("rejected");
                      }}
                    />
                  </>
                }
              >
                <div className="flex flex-col items-start w-full">
                  <h3 className="font-semibold">{exp.hospitalName}</h3>
                  <p className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor={`title-${exp.id}`}>Title</Label>
                    <Input
                      id={`title-${exp.id}`}
                      value={exp.title}
                      onChange={(e) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, title: e.target.value }
                            : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`hospital-${exp.id}`}>Hospital Name</Label>
                    <Input
                      id={`hospital-${exp.id}`}
                      value={exp.hospitalName}
                      onChange={(e) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, hospitalName: e.target.value }
                            : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`city-${exp.id}`}>City</Label>
                    <Select
                      value={exp.city}
                      onValueChange={(value) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id ? { ...ex, city: value } : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    >
                      <SelectTrigger id={`city-${exp.id}`}>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="karachi">Karachi</SelectItem>
                        <SelectItem value="lahore">Lahore</SelectItem>
                        <SelectItem value="islamabad">Islamabad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`employment-${exp.id}`}>Employment</Label>
                    <Select
                      value={exp.employment}
                      onValueChange={(value) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id ? { ...ex, employment: value } : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    >
                      <SelectTrigger id={`employment-${exp.id}`}>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fulltime">Fulltime</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${exp.id}`}
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, startDate: e.target.value }
                            : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${exp.id}`}
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, endDate: e.target.value }
                            : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`current-${exp.id}`}
                      checked={exp.currentlyWorking}
                      onCheckedChange={(checked) => {
                        const newExperiences = experiences.map((ex) =>
                          ex.id === exp.id
                            ? { ...ex, currentlyWorking: !!checked }
                            : ex
                        );
                        setExperiences(newExperiences);
                      }}
                    />
                    <label
                      htmlFor={`current-${exp.id}`}
                      className="text-sm font-medium leading-none"
                    >
                      I currently work here
                    </label>
                  </div>
                </div>
                <div className="mt-4 space-y-1.5">
                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                  <Textarea
                    id={`description-${exp.id}`}
                    value={exp.description}
                    onChange={(e) => {
                      const newExperiences = experiences.map((ex) =>
                        ex.id === exp.id
                          ? { ...ex, description: e.target.value }
                          : ex
                      );
                      setExperiences(newExperiences);
                    }}
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
