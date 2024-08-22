"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PendingRequest } from "@/types/table";
import { Button } from "../ui/button";
import { ArrowUpDown, EyeIcon, LucideCheck, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RejectRequestDialog from "../RejectRequestDialog";

interface requestsColumnsProps {
  handlePreview: (data: PendingRequest) => void;
  handleAcceptRequest: (data: PendingRequest) => void;
}

interface getColumnProps {
  handlePreview: (data: PendingRequest) => void;
  handleAcceptRequest: (data: PendingRequest) => void;
  type: "requests" | "completed";
}

export const requestsColumns = ({
  handleAcceptRequest,
  handlePreview,
}: requestsColumnsProps): ColumnDef<PendingRequest>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => (
        <div className="capitalize">{Math.floor(Math.random() * 100) + 1}</div>
      ),
    },
    {
      accessorKey: "id",
      header: "Patient ID",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Patient&apos;s Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.avatarUrl} alt="Avatar" />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.getValue("email")}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Age - Gender
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("age")} {row.original.gender}
        </div>
      ),
    },
    {
      accessorKey: "scheduledDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Appointment Date & Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "speciality",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Speciality
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "consultationType",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Consultation Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const request = row.original;

        return (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePreview(row.original)}
            >
              <EyeIcon className="h-5 w-5 cursor-pointer" />
            </Button>
            <RejectRequestDialog
              name={row.original.name}
              onReject={() => console.log("rejected", row.original.id)}
              trigger={
                <Button variant="outline" size="icon">
                  <X className="h-5 w-5 cursor-pointer" />
                </Button>
              }
            />
            <Button
              variant="default"
              size="icon"
              onClick={() => {
                handleAcceptRequest(row.original);
              }}
            >
              <LucideCheck className="h-5 w-5 cursor-pointer" />
            </Button>
          </div>
        );
      },
    },
  ];
};

export const getColumns = ({
  type,
  handleAcceptRequest,
  handlePreview,
}: getColumnProps) => {
  switch (type) {
    case "requests":
      return requestsColumns({ handleAcceptRequest, handlePreview });

    default:
      break;
  }
};
