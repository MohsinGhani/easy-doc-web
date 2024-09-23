"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

interface PreviewDialogProps {
  open: boolean;
  file: {
    name: string;
    preview?: string;
    type: string;
  };
  onClose: () => void;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ file }) => {
  if (!file) return;

  return (
    <>
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>

          <div>
            {file?.type?.startsWith("image/") && file?.preview ? (
              <Image
                src={file?.preview}
                alt={file?.name}
                className="w-full h-auto rounded-lg"
                width={600}
                height={400}
              />
            ) : (
              <p className="text-center text-gray-700">
                Cannot preview this file type.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewDialog;
