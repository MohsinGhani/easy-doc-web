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
import { EyeIcon } from "lucide-react";

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
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handlePreview = (request) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const columns = [
    {
      header: "S.no",
      accessorFn: (row) => `${row.id}`,
    },
    {
      header: "Patient's Name",
      accessorKey: "name",
      cell: ({ row }) => (
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
      accessorFn: (row) => `${row.age} - ${row.gender}`,
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
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="icon"
          onClick={() => handlePreview(row.original)}
        >
          <EyeIcon className="h-4 w-4" />
        </Button>
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
        <CardDescription>
          Review and manage patient approval requests
        </CardDescription>
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
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
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
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>

      <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Approval Request Preview</SheetTitle>
            <SheetDescription>
              Detailed view of the approval request
            </SheetDescription>
          </SheetHeader>
          {selectedRequest && (
            <div className="p-4">
              <div className="mb-4">
                <div className="font-medium text-lg">
                  {selectedRequest.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {selectedRequest.email}
                </div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Gender:</div>
                <div>{selectedRequest.gender}</div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Birth Date:</div>
                <div>{selectedRequest.birthDate}</div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Address:</div>
                <div>{selectedRequest.address}</div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Speciality:</div>
                <div>{selectedRequest.speciality}</div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Scheduled Date:</div>
                <div>{selectedRequest.scheduledDate}</div>
              </div>
              <div className="mb-4">
                <div className="font-medium">Consultation Type:</div>
                <div>{selectedRequest.consultationType}</div>
              </div>
            </div>
          )}
          <SheetClose asChild>
            <Button variant="outline" className="mt-4">
              Close
            </Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default ComprehensivePaginatedTable;
