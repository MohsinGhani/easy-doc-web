import React from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  Sheet,
  SheetFooter,
} from "@/components/ui/sheet";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RejectRequestDialog from "../RejectRequestDialog";

interface RequestReviewSheetProps {
  selectedRequest: any;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

const RequestReviewSheet = ({
  selectedRequest,
  open,
  setOpen,
}: RequestReviewSheetProps) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="sm:max-w-[600px] overflow-x-scroll">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <ArrowLeft
              className="h-7 w-7 cursor-pointer"
              onClick={() => setOpen(false)}
            />

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={selectedRequest?.avatar}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="object-cover rounded-full object-top"
                />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <h2 className="font-medium sm:text-2xl text-lg leading-none">
                  {selectedRequest?.name}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {selectedRequest?.speciality}
                </p>
              </div>
            </div>
          </div>

          <Separator className="!my-6 h-px" />

          <div className="grid sm:gap-8 gap-4 text-start">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Consulting for:</p>
                <p className="font-medium">{`Dr. ${selectedRequest?.name}`}</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Patient name:</p>
                <p className="font-medium">{selectedRequest?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Gender:</p>
                <p className="font-medium">{selectedRequest?.gender}</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Age:</p>
                <p className="font-medium">32</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Blood Group:</p>
                <p className="font-medium">B-</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Specialty:</p>
                <p className="font-medium">Dermatologist</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Consultation type:</p>
                <p className="font-medium">Acne Treatment Consultation</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">
                  Appointment date & time:
                </p>
                <p className="font-medium">
                  12th Aug 2024 - 08:30 am - 10:30 am
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Contact no:</p>
              <p className="font-medium">+123 456 789</p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Email:</p>
              <p className="font-medium">innocentsameer@email.com</p>
            </div>

            <div />

            <div className="space-y-1">
              <p className="text-muted-foreground">Allergies:</p>
              <div className="flex gap-2">
                <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                  Aspirin Allergy
                </div>
                <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                  Antibiotic Allergy{" "}
                </div>
                <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                  Milk Allergy{" "}
                </div>
                <div className="bg-primary/10 rounded text-primary sm:text-sm text-[12px] text-center font-medium p-1.5">
                  Egg Allergy{" "}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Current medications:</p>
              <div className="flex gap-2">
                <div className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2">
                  Panadol - 25mg
                </div>
                <div className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2">
                  Brunol - 25mg
                </div>
                <div className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2">
                  Tylenol - 25mg
                </div>
                <div className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2">
                  Advil - 25mg
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <SheetTitle>Description:</SheetTitle>
              <p>
                Consectetur adipisicing eliteiuim sete eiu tempor incidit
                utoreas etnalom dolore maena aliquae udiminimate veniam quis
                norud exercita ullamco laboris nisi aliquip commodo consequat
                Duis aute irure inem reprederit inoluptate velit esse cillum
                dolore eu fugiat nulla pariatur eexcepteur occaecat cupidatat
                non proident sunt in culpa qui officia deserunt mollit anim id
                est laborum sed ut perspiciatis unde n culpa qui officia
                deserunt mollit anim id est laborum sed ut perspiciatis{" "}
              </p>
            </div>

            <div className="space-y-4">
              <SheetTitle>Documents:</SheetTitle>

              <div className="grid gap-4">
                {selectedRequest?.attachments?.map(
                  (attachment: any, index: number) => (
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between w-full hover:underline hover:bg-muted-foreground/20 rounded-lg px-2"
                      key={index}
                    >
                      <div className="font-medium">{attachment?.fileName}</div>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <SheetFooter className="items-center justify-center gap-4 flex-row">
          <RejectRequestDialog
            name={selectedRequest?.name}
            onReject={() => console.log("rejected", selectedRequest.id)}
            trigger={
              <Button size={"lg"} variant={"outline"}>
                Reject
              </Button>
            }
          />

          <Button size={"lg"} onClick={handleClose}>
            Accept
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RequestReviewSheet;
