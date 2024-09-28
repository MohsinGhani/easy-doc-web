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
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SPECIALITIES } from "@/constants";
import DeleteDialog from "../common/DeleteDialog";
import { Loader } from "../common/Loader";
import EditServiceDialog from "./EditServiceDialog";
import { authThunks } from "@/lib/features/auth/authThunks";
import AddServiceDialog from "./AddServiceDialog";

// Define the interface for the service and speciality
declare interface Service {
  service: string;
  speciality: string;
  description: string;
  fee: string;
}

export default function ManageServices() {
  // Fetch user services from redux state
  const {
    user: { services, userId },
    loading,
  } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const filteredSpecialities = SPECIALITIES.map((speciality) => ({
    ...speciality,
    services: services?.filter(
      (service: Service) => service.speciality === speciality.name
    ),
  })).filter((speciality) => speciality?.services?.length > 0);

  if (loading) return <Loader />;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {filteredSpecialities?.map((speciality, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className={"border-none"}
            >
              <AccordionTrigger
                className="hover:no-underline p-4 data-[state=open]:bg-secondary rounded-xl border bg-card text-card-foreground shadow mb-6"
                DeleteIcon={
                  <DeleteDialog
                    trigger={
                      <Trash2 className="h-4 w-4 shrink-0 text-destructive" />
                    }
                    text={`Your all services for ${speciality.name} will be deleted`}
                    onReject={async () => {
                      await dispatch(
                        authThunks.updateProfile({
                          userId: userId,
                          updateData: {
                            services: {
                              value: [
                                services.filter(
                                  (s) => s.speciality !== speciality.name
                                ),
                              ],
                              replace: true,
                            },
                          },
                        })
                      );
                    }}
                  />
                }
              >
                <div className="flex items-center gap-4">
                  {speciality.icon}
                  <span>{speciality.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {speciality.services.length} Services
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                {speciality.services.map((service, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="mb-4 p-4 border rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{service.service}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-blue-500">
                          ${service.fee}
                        </span>
                        <EditServiceDialog
                          service={service}
                          trigger={
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          }
                          serviceIndex={serviceIndex}
                        />

                        <DeleteDialog
                          trigger={
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 cursor-pointer" />
                            </Button>
                          }
                          text="Your service will be deleted"
                          onReject={async () => {
                            const updatedData = services.filter(
                              (s) => s.service !== service.service
                            );

                            await dispatch(
                              authThunks.updateProfile({
                                userId: userId,
                                updateData: {
                                  services: {
                                    value: updatedData,
                                    replace: true,
                                  },
                                },
                              })
                            );
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Update Services</Button>
      </CardFooter> */}
    </Card>
  );
}
