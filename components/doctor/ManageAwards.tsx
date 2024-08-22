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
        <div className="flex justify-between items-center">
          <CardTitle>Awards Details</CardTitle>
          <AddExperienceDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {awards.map((award, index) => (
            <AccordionItem value={`item-${index}`} key={award.id}>
              <AccordionTrigger
                className="hover:no-underline"
                DeleteIcon={
                  <>
                    <DeleteDialog
                      trigger={
                        <Trash2 className="h-4 w-4 shrink-0 text-destructive" />
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
                <div className="flex justify-between items-center mb-4 w-full">
                  <div className="flex items-center">
                    <Image
                      src={award.icon}
                      alt="Hospital"
                      className="w-10 h-10 rounded mr-2"
                      width={40}
                      height={40}
                    />
                    <div className="flex flex-col items-start">
                      <h3 className="font-semibold">
                        {award.awardName} at {award.hospital}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {award.startDate} - {award.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
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
                    />
                  </div>
                  <div>
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
                    />
                  </div>
                  <div>
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
                    />
                  </div>
                  <div>
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
                <div className="mt-4">
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
