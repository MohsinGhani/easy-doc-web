"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button, buttonVariants } from "../ui/button";
import {
  ArrowUpDown,
  EllipsisVertical,
  EyeIcon,
  Filter,
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
import { format, isValid, isWithinInterval } from "date-fns";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import RejectAppointmentDialog from "../patient/CancelAppointmentDialog";
import { cn, formatTimeForUI } from "@/lib/utils";
import Link from "next/link";

interface requestsColumnsProps {
  handlePreview: (data: Appointment) => void;
  handleAcceptRequest: (data: Appointment) => void;
  handleRejectRequest: (data: Appointment) => void;
}

interface upcomingColumnsProps {
  role: string;
}
interface PatientColumnsProps {
  handlePreview: (data: Appointment) => void;
  handleCancel: (data: Appointment) => void;
}

export const paymentsColumns = (): ColumnDef<Payment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "paymentId",
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
        <div className="capitalize max-w-20 truncate">
          PA-{row.getValue("paymentId")}
        </div>
      ),
    },
    {
      accessorKey: "payment_method",
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
      cell: ({ getValue }) => {
        const card = getValue() as string;

        return (
          <Image
            src={`/assets/icons/stripe.svg`}
            alt={"role"}
            width={57}
            height={19}
          />
        );
      },
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "created",
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
        className: "sticky right-0 bg-white z-10 shadow shadow-lg px-2",
      },
    },
  ];
};

export const requestsColumns = ({
  handleAcceptRequest,
  handlePreview,
  handleRejectRequest,
}: requestsColumnsProps): ColumnDef<Appointment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "patient.email",
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
            <AvatarImage
              src={row.original.patient?.picture}
              alt="Avatar"
              className="object-cover rounded-full object-top"
            />
            <AvatarFallback>
              {row.original.patient?.given_name.charAt(0)}{" "}
              {row.original.patient?.family_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {row.original.patient?.given_name}
            </div>
            {/* <div className="text-sm text-muted-foreground">
              {row.getValue("email")}
            </div> */}
            <div className="text-sm text-muted-foreground">
              {row.original.patient?.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "patient.age",
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
          {row.original.patient?.age}, {row.original.patient?.gender}
        </div>
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "scheduled_date",
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
      cell: ({ getValue, row }) => {
        const value = getValue() as DateRange;
        const appointment_date = row.original.appointment_date;

        if (!appointment_date || !value) {
          return "N/A";
        }

        const appointmentDate = new Date(appointment_date);

        if (!isValid(appointmentDate)) {
          return "Invalid Date";
        }

        return `${appointment_date} - ${value.start_time} - ${value.end_time}`;
      },
      filterFn: (row, _, filterValue: { start: Date; end: Date }) => {
        const appointment_date = row.original.appointment_date;
        if (!appointment_date || !filterValue) return true;
        const appointmentDate = new Date(appointment_date);
        const { start, end } = filterValue;

        return isWithinInterval(appointmentDate, { start, end });
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
      accessorKey: "consultation_type",
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePreview(row.original)}
                    >
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">View Request</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <RejectRequestDialog
                      name={row.original.patient?.given_name}
                      onReject={() => handleRejectRequest(row.original)}
                      trigger={
                        <Button variant="outline" size="icon">
                          <X className="h-5 w-5 cursor-pointer" />
                        </Button>
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top">Cancel Request</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => handleAcceptRequest(row.original)}
                    >
                      <LucideCheck className="h-5 w-5 cursor-pointer" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Approve Request</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Visible on mobile, hidden on larger screens */}
            <div className="sm:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <EllipsisVertical className="h-5 w-5 cursor-pointer" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="left"
                  className="flex flex-col items-start gap-2 w-40"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handlePreview(row.original)}
                  >
                    <EyeIcon className="h-5 w-5 mr-2" /> View Request
                  </Button>
                  <RejectRequestDialog
                    name={row.original.patient?.given_name}
                    onReject={() => handleRejectRequest(row.original)}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <X className="h-5 w-5 mr-2" /> Cancel Request
                      </Button>
                    }
                  />
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handleAcceptRequest(row.original)}
                  >
                    <LucideCheck className="h-5 w-5 mr-2" /> Approve Request
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      },
      meta: {
        className: "sticky right-0 bg-white z-10 shadow-lg",
      },
    },
  ];
};

export const patientColumns = ({
  handlePreview,
  handleCancel,
}: PatientColumnsProps): ColumnDef<Appointment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "patient.email",
      id: "patient.email",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => {
        const email = getValue() as string;
        return <div>{email}</div>;
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "scheduled_date",
      id: "scheduled_date",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row }) => {
        const value = getValue() as any; // Adjust the type as needed
        const appointment_date = row.original.appointment_date;

        if (!appointment_date || !value) {
          return "N/A";
        }

        const appointmentDate = new Date(appointment_date);

        if (!isValid(appointmentDate)) {
          return "Invalid Date";
        }

        return `${appointment_date} - ${formatTimeForUI(
          value.start_time
        )} - ${formatTimeForUI(value.end_time)}`;
      },
      filterFn: (row, _columnId, filterValue: { start: Date; end: Date }) => {
        const appointment_date = row.original.appointment_date;
        if (!appointment_date || !filterValue) return true;
        const appointmentDate = new Date(appointment_date);
        const { start, end } = filterValue;

        return isWithinInterval(appointmentDate, { start, end });
      },
    },
    {
      accessorKey: "speciality",
      id: "speciality",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speciality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <div className="capitalize">{getValue() as string}</div>
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "consultation_type",
      id: "consultation_type",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:block">Consultation </span>Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      id: "status",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Status</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue }) => (
        <div className="capitalize">{getValue() as string}</div>
      ),
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
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePreview(row.original)}
                    >
                      <EyeIcon className="h-5 w-5 cursor-pointer" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">View Details</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <RejectAppointmentDialog
                      reason={row.original.reason}
                      onReject={() => handleCancel(row.original)}
                      trigger={
                        <Button variant="outline" size="icon">
                          <X className="h-5 w-5 cursor-pointer" />
                        </Button>
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent side="top">Cancel Appointment</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Visible on mobile, hidden on larger screens */}
            <div className="sm:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Filter className="h-5 w-5 cursor-pointer" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="left"
                  className="flex flex-col items-start gap-2 w-40"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => handlePreview(row.original)}
                  >
                    <EyeIcon className="h-5 w-5 mr-2" /> View Details
                  </Button>
                  <RejectAppointmentDialog
                    reason={row.original.reason}
                    onReject={() => handleCancel(row.original)}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <X className="h-5 w-5 mr-2" /> Cancel Appointment
                      </Button>
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      },
      meta: {
        className: "sticky right-0 bg-white z-10 shadow-lg",
      },
    },
  ];
};

export const upcomingColumns = ({
  role,
}: upcomingColumnsProps): ColumnDef<Appointment>[] => {
  return [
    {
      accessorKey: "patient",
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
      cell: ({ row, getValue }) => {
        const patient = getValue() as User;
        if (!patient) return null;
        return (
          <div className="flex items-start gap-2">
            <Avatar>
              <AvatarImage
                src={patient.picture}
                alt="Avatar"
                className="object-cover rounded-full object-top"
              />
              <AvatarFallback>{patient.given_name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="text-xs font-normal text-muted-foreground max-w-20 truncate">
                # PA-{patient.userId}
              </div>
              <div className="text-base font-semibold">
                {patient.given_name}
              </div>
              <div className="text-sm text-muted-foreground flex items-center">
                <MapPin className="mr-1 h-4 w-4" /> Florida , USA
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "scheduled_date",
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
      cell: ({ getValue, row }) => {
        const value = getValue() as DateRange;
        const appointment_date = row.original.appointment_date;

        if (!appointment_date || !value) {
          return "N/A";
        }

        const appointmentDate = new Date(appointment_date);

        if (!isValid(appointmentDate)) {
          return "Invalid Date";
        }

        return `${appointment_date} - ${formatTimeForUI(
          value.start_time
        )} - ${formatTimeForUI(value.end_time)}`;
      },
      filterFn: (row, _, filterValue: { start: Date; end: Date }) => {
        const appointment_date = row.original.appointment_date;
        if (!appointment_date || !filterValue) return true;
        const appointmentDate = new Date(appointment_date);
        const { start, end } = filterValue;

        return isWithinInterval(appointmentDate, { start, end });
      },
    },
    {
      accessorKey: "patient.email",
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
      cell: ({ row, getValue }) => (
        <div className="flex flex-col gap-2">
          <div className="text-sm font-normal flex gap-1 items-center">
            <Mail className="w-5 h-5" />
            {getValue() as string}
          </div>
          <div className="text-sm font-normal flex gap-1 items-center">
            <PhoneCall className="w-5 h-5" />
            {row.original.patient.phone_number}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "consultation_type",
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
          {row.getValue("consultation_type")} Consultation
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const appointment_date = row.original.appointment_date;

        return (
          <div className="flex items-center gap-1.5">
            {/* Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:flex items-center gap-1.5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/${role === "patient" && "my-"}conversations/${
                        row.original.appointmentId
                      }`}
                      className={cn(
                        buttonVariants({ size: "icon", variant: "outline" }), "p-2"
                      )}
                    >
                      <MessageCircle className="h-5 w-5 cursor-pointer text-primary" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">Start Conversation</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      className={cn(
                        buttonVariants({ size: "icon", variant: "outline" }),
                        "w-full justify-start p-2",
                        {
                          "pointer-events-none cursor-not-allowed":
                            new Date(appointment_date) < new Date() ||
                            new Date(appointment_date) >
                              new Date(new Date().getTime() + 30 * 60 * 1000),
                        }
                      )}
                      href={`/meeting/${row.original.appointmentId}`}
                    >
                      <Video className="h-5 w-5 cursor-pointer text-primary" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">Join Meeting</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
                  <Link
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "w-full justify-start",
                      {
                        "pointer-events-none cursor-not-allowed":
                          new Date(appointment_date) < new Date() ||
                          new Date(appointment_date) >
                            new Date(new Date().getTime() + 30 * 60 * 1000),
                      }
                    )}
                    href={`/meeting/${row.original.appointmentId}`}
                  >
                    <Video className="h-5 w-5 mr-2" /> Join Meeting
                  </Link>
                  <Link
                    href={`/${role === "patient" && "my-"}conversations/${
                      row.original.appointmentId
                    }`}
                    className={cn(
                      buttonVariants({ size: "sm", variant: "outline" }),
                      "w-full justify-start"
                    )}
                  >
                    <MessageCircle className="h-5 w-5 mr-2" /> Start
                    Conversation
                  </Link>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        );
      },
      meta: {
        className: "sticky right-0 bg-white z-10",
      },
    },
  ];
};

export const cancelledColumns = (): ColumnDef<Appointment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "scheduled_date",
      id: "scheduled_date",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row }) => {
        const value = getValue() as any; // Adjust the type as needed
        const appointment_date = row.original.appointment_date;

        if (!appointment_date || !value) {
          return "N/A";
        }

        const appointmentDate = new Date(appointment_date);

        if (!isValid(appointmentDate)) {
          return "Invalid Date";
        }

        return `${appointment_date} - ${formatTimeForUI(
          value.start_time
        )} - ${formatTimeForUI(value.end_time)}`;
      },
      filterFn: (row, _columnId, filterValue: { start: Date; end: Date }) => {
        const appointment_date = row.original.appointment_date;
        if (!appointment_date || !filterValue) return true;
        const appointmentDate = new Date(appointment_date);
        const { start, end } = filterValue;

        return isWithinInterval(appointmentDate, { start, end });
      },
    },
    {
      accessorKey: "speciality",
      id: "speciality",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speciality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("speciality")}</div>
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "consultation_type",
      id: "consultation_type",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:block">Consultation </span>Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ];
};

export const completedColumns = (): ColumnDef<Appointment>[] => {
  return [
    {
      header: "S.no",
      cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>,
    },
    {
      accessorKey: "scheduled_date",
      id: "scheduled_date",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Appointment Date & Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ getValue, row }) => {
        const value = getValue() as any; // Adjust the type as needed
        const appointment_date = row.original.appointment_date;

        if (!appointment_date || !value) {
          return "N/A";
        }

        const appointmentDate = new Date(appointment_date);

        if (!isValid(appointmentDate)) {
          return "Invalid Date";
        }

        return `${appointment_date} - ${formatTimeForUI(
          value.start_time
        )} - ${formatTimeForUI(value.end_time)}`;
      },
      filterFn: (row, _columnId, filterValue: { start: Date; end: Date }) => {
        const appointment_date = row.original.appointment_date;
        if (!appointment_date || !filterValue) return true;
        const appointmentDate = new Date(appointment_date);
        const { start, end } = filterValue;

        return isWithinInterval(appointmentDate, { start, end });
      },
    },
    {
      accessorKey: "speciality",
      id: "speciality",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Speciality
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("speciality")}</div>
      ),
      meta: { className: "hidden sm:table-cell" },
    },
    {
      accessorKey: "consultation_type",
      id: "consultation_type",
      header: ({ column }) => (
        <Button
          className="px-1.5"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="hidden md:block">Consultation </span>Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
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
        className: "sticky right-0 bg-white z-10 shadow shadow-lg px-2",
      },
    },
  ];
};
