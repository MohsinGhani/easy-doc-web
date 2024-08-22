"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

interface SuccessPageProps {
  heading: string;
  linkText: string;
  linkHref: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const SuccessPage = ({
  heading,
  linkText,
  linkHref,
  open,
  setOpen,
}: SuccessPageProps) => {
  const handleClose = () => {
    setOpen && setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] h-[396px] p-16 rounded-[10px] bg-white flex-col justify-center items-center gap-2.5 inline-flex border">
        <div className="h-[270px] flex-col justify-start items-center gap-8 flex">
          <Image
            src={"/assets/images/success.png"}
            alt="logo"
            width={160}
            height={144}
          />
          <div className="self-stretch h-[94px] flex-col justify-start items-center gap-6 flex">
            <div className="text-black text-2xl font-medium">{heading}</div>

            <Link href={linkHref}>
              <Button
                size={"xl"}
                className="w-[274px] h-10"
                onClick={handleClose}
              >
                {linkText}
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPage;
