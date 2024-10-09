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

interface RejectRequestDialogProps {
  name: string;
  onReject: () => void;
  getNote?: boolean;
  trigger: React.ReactNode;
}

const RejectRequestDialog = ({
  name,
  onReject,
  getNote = false,
  trigger,
}: RejectRequestDialogProps) => {
  const [note, setNote] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Are you sure want to decline request of {name}?
          </DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>

        {getNote && (
          <div className="grid flex-1 gap-2">
            <Label className="sr-only">Note</Label>
            <Input
              placeholder="Provide a reason for the appointment's rejection (required)"
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
              Reject
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectRequestDialog;
