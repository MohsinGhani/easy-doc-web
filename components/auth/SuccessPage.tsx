"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SuccessPage = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px] h-[396px] p-16 rounded-[10px] bg-white flex-col justify-center items-center gap-2.5 inline-flex border">
        <div className="h-[270px] flex-col justify-start items-center gap-8 flex">
          <Image
            src={"/assets/images/success.png"}
            alt="logo"
            width={160}
            height={144}
          />
          <div className="self-stretch h-[94px] flex-col justify-start items-center gap-6 flex">
            <div className="text-black text-2xl font-medium">
              Account Created!
            </div>
            <Link href={"/"}>
              <Button size={"xl"} className="w-[274px] h-10">
                Okay
              </Button>{" "}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessPage;
