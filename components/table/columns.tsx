"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  BaseAppointment,
  PendingRequest,
  Payment,
  UpcomingAppointment,
} from "@/types/table";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  EllipsisVertical,
  EyeIcon,
  LucideCheck,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
  ReceiptText,
  Video,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RejectRequestDialog from "../RejectRequestDialog";
import { format, isValid, isWithinInterval, setYear } from "date-fns";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface requestsColumnsProps {
  handlePreview: (data: PendingRequest) => void;
  handleAcceptRequest: (data: PendingRequest) => void;
}

interface upcomingColumnsProps {
  handleMeetingJoin: (data: PendingRequest) => void;
  handleChat: (data: PendingRequest) => void;
}

export const paymentsColumns = (): ColumnDef<Payment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">PA-{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "method",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Method
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <Image
          src={`/assets/icons/${row.getValue("method")}.svg`}
          alt={"role"}
          width={57}
          height={19}
        />
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "paymentDate",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Payment Date<span className="md:block hidden"> & Time</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as Date | string;
        const paymentDate = value instanceof Date ? value : new Date(value);

        if (!isValid(paymentDate)) {
          return "Invalid Date";
        }

        return format(paymentDate, "d MMM, h:mm a");
      },
      filterFn: (row, columnId, filterValue: { start: Date; end: Date }) => {
        const cellValue = row.getValue(columnId) as Date | string;
        const paymentDate =
          cellValue instanceof Date ? cellValue : new Date(cellValue);

        if (!isValid(paymentDate) || !filterValue) return true;
        const { start, end } = filterValue;

        return isWithinInterval(paymentDate, { start, end });
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  // TODO: add a preview fn
                  // onClick={() => handlePreview(row.original)}
                >
                  <ReceiptText className="h-5 w-5 cursor-pointer" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>View Receipt</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      meta: {
        className: "sticky -right-px bg-white z-10 shadow shadow-lg px-2",
      },
    },
  ];
};

export const requestsColumns = ({
  handleAcceptRequest,
  handlePreview,
}: requestsColumnsProps): ColumnDef<PendingRequest>[] => {
  return [
    {
      // accessorKey: "id",
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="px-1.5"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="hidden md:block">Patient Id</span>
            <span className="block md:hidden">P-Id</span>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {Math.floor(Math.random() * 100000) + 1}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
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
            {/* <div className="text-sm text-muted-foreground">
              {row.getValue("email")}
            </div> */}
            <div className="text-sm text-muted-foreground">London , UK</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
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
          {row.getValue("age")}, {row.original.gender}
        </div>
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "scheduledDate",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Appointment Date & Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as { from: Date | string; to: Date | string };

        const fromDate =
          value.from instanceof Date ? value.from : new Date(value.from);
        const toDate = value.to instanceof Date ? value.to : new Date(value.to);

        if (!isValid(fromDate) || !isValid(toDate)) {
          return "Invalid Date";
        }

        return `${format(fromDate, "MMM dd, HH:mm")} - ${format(
          toDate,
          "MMM dd, HH:mm"
        )}`;
      },
      filterFn: (row, columnId, filterValue: { start: Date; end: Date }) => {
        const cellValue = row.getValue(columnId) as { from: Date; to: Date };
        if (!cellValue || !filterValue) return true;
        const { start, end } = filterValue;
        const cellDateFrom = setYear(new Date(cellValue.from), 2024);
        const cellDateTo = setYear(new Date(cellValue.to), 2024);
        return (
          isWithinInterval(cellDateFrom, { start, end }) ||
          isWithinInterval(cellDateTo, { start, end }) ||
          (cellDateFrom <= start && cellDateTo >= end)
        );
      },
    },
    {
      accessorKey: "speciality",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Speciality
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "consultationType",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <span className="hidden md:block">Consultation </span>Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            {/* Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:flex items-center gap-1.5">
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

            {/* Visible on mobile, hidden on larger screens */}
            <div className="sm:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical className="h-5 w-5 cursor-pointer" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="left" className="flex flex-col items-start gap-2 w-40">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handlePreview(row.original)}
                  >
                    <EyeIcon className="h-5 w-5 mr-2" /> View
                  </Button>
                  <RejectRequestDialog
                    name={row.original.name}
                    onReject={() => console.log("rejected", row.original.id)}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <X className="h-5 w-5 mr-2" /> Cancel
                      </Button>
                    }
                  />
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => {
                      handleAcceptRequest(row.original);
                    }}
                  >
                    <LucideCheck className="h-5 w-5 mr-2" /> Approve
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      },
      meta: {
        className: "sticky -right-px bg-white z-10 shadow-lg",
      },
    },
  ];
};

export const upcomingColumns = ({
  handleMeetingJoin,
  handleChat,
}: upcomingColumnsProps): ColumnDef<UpcomingAppointment>[] => {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Patient&apos;s Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-start gap-2">
            <Avatar>
              <AvatarImage src={row.original.avatarUrl} alt="Avatar" />
              <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-xs font-normal text-muted-foreground">
                # PA-{row.getValue("id")}
              </div>
              <div className="text-base font-semibold">{row.original.name}</div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> Florida , USA
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "scheduledDate",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Appointment Date & Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ getValue }) => {
        const value = getValue() as { from: Date | string; to: Date | string };

        const fromDate =
          value.from instanceof Date ? value.from : new Date(value.from);
        const toDate = value.to instanceof Date ? value.to : new Date(value.to);

        if (!isValid(fromDate) || !isValid(toDate)) {
          return "Invalid Date";
        }

        const formattedDate = `${format(fromDate, "MMM dd, HH:mm")} - ${format(
          toDate,
          "MMM dd, HH:mm"
        )}`;

        return <div className="text-sm font-normal">{formattedDate}</div>;
      },
      filterFn: (row, columnId, filterValue: { start: Date; end: Date }) => {
        const cellValue = row.getValue(columnId) as { from: Date; to: Date };
        if (!cellValue || !filterValue) return true;
        const { start, end } = filterValue;
        const cellDateFrom = setYear(new Date(cellValue.from), 2024);
        const cellDateTo = setYear(new Date(cellValue.to), 2024);
        return (
          isWithinInterval(cellDateFrom, { start, end }) ||
          isWithinInterval(cellDateTo, { start, end }) ||
          (cellDateFrom <= start && cellDateTo >= end)
        );
      },
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-normal flex gap-1 items-center">
            <Mail className="w-5 h-5" />
            {row.getValue("email")}
          </div>
          <div className="text-sm font-normal flex gap-1 items-center">
            <PhoneCall className="w-5 h-5" />
            {row.original.phone}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "consultationType",
      header: ({ column }) => {
        return (
          <Button
            className="px-1.5"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Consultation Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-sm font-normal">
          {row.getValue("consultationType")} Consultation
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1.5">
            {/* Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon"
                className="border-primary bg-primary/20 p-2"
                onClick={() => handleMeetingJoin(row.original)}
              >
                <MessageCircle className="h-5 w-5 cursor-pointer text-primary" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-primary bg-primary/20 p-2"
                onClick={() => handleChat(row.original)}
              >
                <Video className="h-5 w-5 cursor-pointer text-primary" />
              </Button>
            </div>

            {/* Visible on mobile, hidden on larger screens */}
            <div className="sm:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical className="h-5 w-5 cursor-pointer" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col items-start gap-2 w-40">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleMeetingJoin(row.original)}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" /> Join Meeting
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleChat(row.original)}
                  >
                    <Video className="h-5 w-5 mr-2" /> Start Chat
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      },
      meta: {
        className: "sticky -right-px bg-white z-10",
      },
    },
  ];
};

export function createAppointment(id: string, index: number): BaseAppointment {
  return {
    id,
    avatarUrl: `https://i.pravatar.cc/150?img=${index}`,
    patientId: `PID-${id}`,
    name: `Patient ${id}`,
    email: `patient${id}@example.com`,
    phone: `+123456789${id}`,
    city: `City ${id}`,
    state: `State ${id}`,
    country: `Country ${id}`,
    scheduledDate: {
      from: new Date(Date.now() + Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() + Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    consultationType: "General",
    gender: "Male",
    address: `Address ${id}`,
    birthDate: "1990-01-01",
    speciality: "General",
    age: 30,
    attachments: [
      {
        id: `ATT-${id}-1`,
        url: `https://i.pravatar.cc/150?img=${index}`,
        name: `Document 1`,
        mimeType: `application/pdf`,
      },
      {
        id: `ATT-${id}-2`,
        url: `https://i.pravatar.cc/150?img=${index + 1}`,
        name: `Document 2`,
        mimeType: `application/pdf`,
      },
    ],
  };
}
