"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface SuccessPageProps {
  heading: string;
  subHeading?: string;
  linkText: string;
  linkHref: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const SuccessPage = ({
  heading,
  subHeading,
  linkText,
  linkHref,
  open = true,
  setOpen,
}: SuccessPageProps) => {
  const handleClose = () => {
    setOpen && setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          "sm:max-w-[425px] w-[90%] p-10 min-h-[320px] flex flex-col items-center justify-center gap-6 text-center"
        )}
      >
        <Image
          src={"/assets/images/success.png"}
          alt="logo"
          width={160}
          height={144}
        />
        <h2 className="text-black text-2xl font-medium">{heading}</h2>

        {subHeading && (
          <p className="text-muted-foreground text-base font-normal">
            {subHeading}
          </p>
        )}

        <Link
          href={linkHref}
          className={cn(
            "w-full",
            buttonVariants({ size: "xl", variant: "default" })
          )}
          onClick={handleClose}
        >
          {linkText}
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPage;
