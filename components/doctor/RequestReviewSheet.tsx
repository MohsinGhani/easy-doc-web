import React from "react";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  Sheet,
  SheetFooter,
} from "@/components/ui/sheet";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RejectRequestDialog from "../RejectRequestDialog";

interface RequestReviewSheetProps {
  selectedRequest: Appointment | null;
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

  if (!selectedRequest) return null;

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
                  src={selectedRequest?.patient.picture}
                  alt="Avatar"
                  width={50}
                  height={50}
                  className="object-cover rounded-full object-top"
                />
                <AvatarFallback>
                  {selectedRequest.patient.patient_name
                    .charAt(0)
                    .toUpperCase() +
                    selectedRequest.patient.patient_name.slice(1)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-1">
                <h2 className="font-medium sm:text-2xl text-lg leading-none">
                  {selectedRequest?.patient.patient_name}
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
                <p className="font-medium">{`Dr. ${selectedRequest?.consulting_for}`}</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Patient name:</p>
                <p className="font-medium">
                  {selectedRequest?.patient.patient_name}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Gender:</p>
                <p className="font-medium">{selectedRequest?.patient.gender}</p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Age:</p>
                <p className="font-medium">{selectedRequest?.patient.age}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Blood Group:</p>
                <p className="font-medium">
                  {selectedRequest?.patient.blood_group}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">Specialty:</p>
                <p className="font-medium">{selectedRequest?.speciality}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-1">
                <p className="text-muted-foreground">Consultation type:</p>
                <p className="font-medium">
                  {selectedRequest?.consultation_type}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-muted-foreground">
                  Appointment date & time:
                </p>
                <p className="font-medium">
                  {`${selectedRequest.appointment_date} - ${selectedRequest.scheduled_date.start_time} - ${selectedRequest.scheduled_date.end_time}`}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Contact no:</p>
              <p className="font-medium">
                {selectedRequest.patient.phone_number}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Email:</p>
              <p className="font-medium">{selectedRequest.patient.email}</p>
            </div>

            <div />

            <div className="space-y-1">
              <p className="text-muted-foreground">Allergies:</p>
              <div className="flex gap-2">
                {selectedRequest.allergies.map(
                  (allergy: string, index: number) => (
                    <div
                      key={index}
                      className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2"
                    >
                      {allergy}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Current medications:</p>
              <div className="flex gap-2">
                {selectedRequest.current_medications.map(
                  (medication: string, index: number) => (
                    <div
                      key={index}
                      className="bg-foreground/10 rounded sm:text-sm text-[12px] text-center font-semibold p-2"
                    >
                      {medication}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="space-y-4">
              <SheetTitle>Description:</SheetTitle>
              <p>{selectedRequest.description}</p>
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
            name={selectedRequest?.patient.patient_name}
            onReject={() => console.log("rejected", selectedRequest.patientId)}
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
