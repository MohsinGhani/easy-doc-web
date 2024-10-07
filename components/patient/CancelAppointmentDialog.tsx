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

interface CancelAppointmentProps {
  reason: string;
  onReject: () => void;
  getNote?: boolean;
  trigger: React.ReactNode;
}

const RejectAppointmentDialog: React.FC<CancelAppointmentProps> = ({
  reason,
  onReject,
  getNote = true,
  trigger,
}) => {
  const [note, setNote] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Are you sure want to cancel the appointment for {reason}?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        {getNote && (
          <div className="grid flex-1 gap-2">
            <Label className="sr-only">Note</Label>
            <Input
              placeholder="Provide a reason for the appointment's cancellation (required)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button size={"lg"} variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              onClick={onReject}
              type="button"
              variant="destructive"
              size={"lg"}
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectAppointmentDialog;
