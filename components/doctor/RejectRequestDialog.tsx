import { useAppDispatch } from "@/lib/hooks";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const RejectRequestDialog = ({
  verificationId,
  doctorName,
}: {
  verificationId: string;
  doctorName: string;
}) => {
  const [note, setNote] = useState("");
  const dispatch = useAppDispatch();

  const handleRejectDoctorRequest = () => {
    // dispatch(doctorThunks.rejectDoctorRequest({ verificationId, note }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size={"lg"}>
          Decline
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
          <DialogDescription>
            You are gonna reject the request of {doctorName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid flex-1 gap-2">
          <Label className="sr-only">Note</Label>
          <Input
            placeholder="Provide a reason for the doctor's rejection (required)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button size={"lg"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleRejectDoctorRequest}
              type="button"
              variant="destructive"
              size={"lg"}
            >
              Reject
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectRequestDialog;
