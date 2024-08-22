"use client";

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
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DeleteDialogProps {
  className?: string;
  title?: string;
  text?: string;
  trigger: React.ReactNode;
  onReject: () => void;
}

const DeleteDialog = ({
  title = "",
  trigger,
  text = "",
  className,
  onReject,
}: DeleteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{`Are you sure ${title}?`}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. {text}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end gap-2">
          <DialogClose
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "outline",
              })
            )}
          >
            Cancel
          </DialogClose>

          <DialogClose
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "destructive",
              })
            )}
            onClick={onReject}
          >
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
