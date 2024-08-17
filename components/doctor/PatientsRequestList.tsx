"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { EyeIcon, LucideCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RequestReviewSheet from "./RequestReviewSheet";

const approvalRequests = [
  {
    id: 1,
    name: "Liam Johnson",
    email: "liam@example.com",
    gender: "Male",
    birthDate: "1990-01-01",
    address: "123 Main St",
    speciality: "Cardiology",
    age: 30,
    city: "New York",
    state: "NY",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    scheduledDate: "12th Aug 2024 - 08:30 am - 10:30 am",
    consultationType: "Routine Checkup",
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma@example.com",
    gender: "Female",
    birthDate: "1988-05-15",
    address: "456 Elm St",
    speciality: "Pediatrics",
    age: 32,
    city: "Los Angeles",
    state: "CA",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    scheduledDate: "14th Aug 2024 - 10:00 am - 11:00 am",
    consultationType: "Follow-up",
  },
  // Add more dummy data for pagination
  {
    id: 3,
    name: "Noah Brown",
    email: "noah@example.com",
    gender: "Male",
    birthDate: "1992-02-20",
    address: "789 Maple St",
    speciality: "Orthopedics",
    age: 28,
    city: "Chicago",
    state: "IL",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    scheduledDate: "16th Aug 2024 - 09:00 am - 10:00 am",
    consultationType: "Initial Consultation",
  },
  {
    id: 4,
    name: "Ava Davis",
    email: "ava@example.com",
    gender: "Female",
    birthDate: "1995-06-10",
    address: "101 Pine St",
    speciality: "Dermatology",
    age: 25,
    city: "San Francisco",
    state: "CA",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    scheduledDate: "18th Aug 2024 - 11:00 am - 12:00 pm",
    consultationType: "Skin Check",
  },
  {
    id: 5,
    name: "Sophia Martinez",
    email: "sophia@example.com",
    gender: "Female",
    birthDate: "1993-11-05",
    address: "202 Oak St",
    speciality: "Neurology",
    age: 27,
    city: "Houston",
    state: "TX",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    scheduledDate: "20th Aug 2024 - 02:00 pm - 03:00 pm",
    consultationType: "Follow-up",
  },
  {
    id: 6,
    name: "James Lee",
    email: "james@example.com",
    gender: "Male",
    birthDate: "1985-12-25",
    address: "303 Cedar St",
    speciality: "Gastroenterology",
    age: 35,
    city: "Miami",
    state: "FL",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=6",
    scheduledDate: "22nd Aug 2024 - 03:00 pm - 04:00 pm",
    consultationType: "Routine Checkup",
  },
  {
    id: 7,
    name: "Mia Garcia",
    email: "mia@example.com",
    gender: "Female",
    birthDate: "1991-09-14",
    address: "404 Birch St",
    speciality: "Endocrinology",
    age: 29,
    city: "Seattle",
    state: "WA",
    country: "USA",
    avatarUrl: "https://i.pravatar.cc/150?img=7",
    scheduledDate: "24th Aug 2024 - 01:00 pm - 02:00 pm",
    consultationType: "Initial Consultation",
  },
];

const ComprehensivePaginatedTable = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handlePreview = (request: any) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const columns = [
    {
      header: "S.no",
      accessorFn: (row: any) => `${row.id}`,
    },
    {
      header: "Patient's Name",
      accessorKey: "name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={row.original.avatarUrl} alt="Avatar" />
            <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-sm text-muted-foreground">
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Age - Gender",
      accessorFn: (row: any) => `${row.age} - ${row.gender}`,
    },
    {
      header: "Speciality",
      accessorKey: "speciality",
    },
    {
      header: "Appointment Date & Time",
      accessorKey: "scheduledDate",
    },
    {
      header: "Consultation Type",
      accessorKey: "consultationType",
    },
    {
      header: "Actions",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreview(row.original)}
          >
            <EyeIcon className="h-5 w-5 cursor-pointer" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <X className="h-5 w-5 cursor-pointer" />
          </Button>
          <Button variant="default" size="icon" onClick={() => {}}>
            <LucideCheck className="h-5 w-5 cursor-pointer" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: approvalRequests,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approval Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    table.getCanPreviousPage() && table.previousPage()
                  }
                  className={cn(
                    table.getCanPreviousPage()
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  )}
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              {[...Array(table.getPageCount())].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(index)}
                    isActive={table.getState().pagination.pageIndex === index}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => table.getCanNextPage() && table.nextPage()}
                  className={cn(
                    table.getCanNextPage()
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  )}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>

      <RequestReviewSheet
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        selectedRequest={selectedRequest}
      />
    </Card>
  );
};

export default ComprehensivePaginatedTable;
