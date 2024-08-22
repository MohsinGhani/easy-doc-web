import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, UserCircle2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function ManageServices() {
  const [services, setServices] = useState([
    {
      category: "Dermatologist",
      icon: <UserCircle2 className="w-8 h-8 text-blue-500" />,
      services: [
        {
          name: "General Skin Examination",
          price: 300,
          description:
            "Consectetur adipiscing efhurum setu eu tempor. Velit viverra etunim elitum nunc. Neque dapibus velit nisi, porttitor nunc. Aliquam lacus volutpat mattis...",
        },
        { name: "Acne Treatment Consultation", price: 300, description: "" },
      ],
    },
    {
      category: "Dentist",
      icon: (
        <Image
          src={"/assets/icons/dentist.svg"}
          alt="dentist"
          width={20}
          height={20}
          className="w-8 h-8 text-blue-500"
        />
      ),
      services: [],
    },
  ]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {services.map((category, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  {category.icon}
                  <span>{category.category}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {category.services.length} Services
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {category.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="mb-4 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{service.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-500">
                          ${service.price}
                        </span>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      placeholder="Description"
                      value={service.description}
                      className="w-full mt-2"
                    />
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Update Services</Button>
      </CardFooter>
    </Card>
  );
}
