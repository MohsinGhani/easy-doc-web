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

export default function ManageEducation() {
  const [educations, setEducations] = useState([
    {
      id: 1,
      institute: "Aga Khan Hospital",
      icon: "https://i.pravatar.cc/40?u=hospital",
      startDate: "2015",
      endDate: "2018",
      degree: "Surgeon",
      field: "Dentist",
      grade: "A",
      city: "Karachi",
      employment: "Fulltime",
      currentlyWorking: false,
      description: "",
    },
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Educational Details</CardTitle>
          <AddExperienceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {educations.map((edu, index) => (
            <AccordionItem value={`item-${index}`} key={edu.id}>
              <AccordionTrigger
                className="hover:no-underline"
                DeleteIcon={
                  <>
                    <DeleteDialog
                      trigger={
                        <Trash2 className="h-4 w-4 shrink-0 text-destructive" />
                      }
                      text="Your education will be deleted"
                      onReject={() => {
                        // do nothing
                        console.log("rejected");
                      }}
                    />
                  </>
                }
              >
                <div className="flex justify-between items-center mb-4 w-full">
                  <div className="flex items-center">
                    <Image
                      src={edu.icon}
                      alt="Hospital"
                      className="w-10 h-10 rounded mr-2"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold">{edu.institute}</h3>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor={`institute-${edu.id}`}>Institute</Label>
                    <Select
                      value={edu.institute}
                      onValueChange={(value) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id ? { ...ex, institute: value } : ex
                        );
                        setEducations(newEducation);
                      }}
                    >
                      <SelectTrigger id={`institute-${edu.id}`}>
                        <SelectValue placeholder="Select Institute" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Oxford University">
                          Oxford University
                        </SelectItem>
                        <SelectItem value="Harvard University">
                          Harvard University
                        </SelectItem>
                        <SelectItem value="Stanford University">
                          Stanford University
                        </SelectItem>
                        <SelectItem value="University of California Berkeley">
                          University of California Berkeley
                        </SelectItem>
                        <SelectItem value="University of Cambridge">
                          University of Cambridge
                        </SelectItem>
                        <SelectItem value="University College London">
                          University College London
                        </SelectItem>
                        <SelectItem value="University of Washington Seattle">
                          University of Washington Seattle
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Select
                      value={edu.degree}
                      onValueChange={(value) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id ? { ...ex, degree: value } : ex
                        );
                        setEducations(newEducation);
                      }}
                    >
                      <SelectTrigger id={`degree-${edu.id}`}>
                        <SelectValue placeholder="Select Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MBBS">MBBS</SelectItem>
                        <SelectItem value="B Pharmacy">B Pharmacy</SelectItem>
                        <SelectItem value="BSc Psychology">
                          BSc Psychology
                        </SelectItem>
                        <SelectItem value="BSc Biomedical Science">
                          BSc Biomedical Science
                        </SelectItem>
                        <SelectItem value="B.Sc. Medical Laboratory Technology (BMLT)">
                          B.Sc. Medical Laboratory Technology (BMLT)
                        </SelectItem>
                        <SelectItem value="B.Sc. Nutrition and Dietetics">
                          B.Sc. Nutrition and Dietetics
                        </SelectItem>
                        <SelectItem value="Agricultural Sciences">
                          Agricultural Sciences
                        </SelectItem>
                        <SelectItem value="Paramedical Courses">
                          Paramedical Courses
                        </SelectItem>
                        <SelectItem value="Bachelor of Physiotherapy">
                          Bachelor of Physiotherapy
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`field-${edu.id}`}>Field of study</Label>
                    <Select
                      value={edu.field}
                      onValueChange={(value) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id ? { ...ex, field: value } : ex
                        );
                        setEducations(newEducation);
                      }}
                    >
                      <SelectTrigger id={`field-${edu.id}`}>
                        <SelectValue placeholder="Select Field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cardiology">Cardiology</SelectItem>
                        <SelectItem value="Dermatology">Dermatology</SelectItem>
                        <SelectItem value="Doctor of Physical Therapy (DPT)">
                          Doctor of Physical Therapy (DPT)
                        </SelectItem>
                        <SelectItem value="Bachelor of Dental Surgery (BDS)">
                          Bachelor of Dental Surgery (BDS)
                        </SelectItem>
                        <SelectItem value="Medical Laboratory Technology">
                          Medical Laboratory Technology
                        </SelectItem>
                        <SelectItem value="Biotechnology">
                          Biotechnology
                        </SelectItem>
                        <SelectItem value="Nanotechnology">
                          Nanotechnology
                        </SelectItem>
                        <SelectItem value="Microbiology">
                          Microbiology
                        </SelectItem>
                        <SelectItem value="Psychology">Psychology</SelectItem>
                        <SelectItem value="Biomedical Engineering">
                          Biomedical Engineering
                        </SelectItem>
                        <SelectItem value="Nursing">Nursing</SelectItem>
                        <SelectItem value="Biogenetics">Biogenetics</SelectItem>
                        <SelectItem value="BHMS (Bachelor of Homeopathic Medicine & Surgery)">
                          BHMS (Bachelor of Homeopathic Medicine & Surgery)
                        </SelectItem>
                        <SelectItem value="Intensive Care">
                          Intensive Care
                        </SelectItem>
                        <SelectItem value="Biochemistry">
                          Biochemistry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 grid gap-1.5">
                  <Label htmlFor={`description-${edu.id}`}>Description</Label>
                  <Textarea
                    id={`description-${edu.id}`}
                    rows={5}
                    value={edu.description}
                    onChange={(e) => {
                      const newEducation = educations.map((ex) =>
                        ex.id === edu.id
                          ? { ...ex, description: e.target.value }
                          : ex
                      );
                      setEducations(newEducation);
                    }}
                  />
                </div>

                <div className="mt-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor={`start-date-${edu.id}`}>Start Date</Label>
                    <Input
                      id={`start-date-${edu.id}`}
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id
                            ? { ...ex, startDate: e.target.value }
                            : ex
                        );
                        setEducations(newEducation);
                      }}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`end-date-${edu.id}`}>End Date</Label>
                    <Input
                      id={`end-date-${edu.id}`}
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id
                            ? { ...ex, endDate: e.target.value }
                            : ex
                        );
                        setEducations(newEducation);
                      }}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor={`grade-${edu.id}`}>Grade</Label>
                    <Select
                      value={edu.grade}
                      onValueChange={(value) => {
                        const newEducation = educations.map((ex) =>
                          ex.id === edu.id ? { ...ex, grade: value } : ex
                        );
                        setEducations(newEducation);
                      }}
                    >
                      <SelectTrigger id={`grade-${edu.id}`}>
                        <SelectValue placeholder="Select Grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A +">A +</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="No Grade">No Grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
