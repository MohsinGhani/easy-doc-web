"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideSearch } from "lucide-react";
import RequestReviewSheet from "./RequestReviewSheet";
import RejectRequestDialog from "../RejectRequestDialog";
import SuccessPage from "../SuccessPage";
import Link from "next/link";
import { getColumns } from "../table/columns";
import { PendingRequest } from "@/types/table";
import { DataTable } from "../table/data-table";

const approvalRequests: PendingRequest[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
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
    id: "7",
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

interface PatientsRequestListProps {
  headerType?: "primary" | "secondary";
}

const PatientsRequestList = ({
  headerType = "primary",
}: PatientsRequestListProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] =
    React.useState<PendingRequest>(null);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const isPrimaryHeader = headerType === "primary";

  const handlePreview = (request: PendingRequest) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const handleAcceptRequest = (request: PendingRequest) => {
    setIsSuccessOpen(true);
  };

  const columns = getColumns({
    type: "requests",
    handleAcceptRequest,
    handlePreview,
  });

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={approvalRequests}
          isPrimaryHeader={isPrimaryHeader}
          title="Patient's Requests"
        />
      </CardContent>

      <RequestReviewSheet
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        selectedRequest={selectedRequest}
      />

      <SuccessPage
        heading="Patient Request Accepted"
        linkText="Okay"
        linkHref="#"
        open={isSuccessOpen}
        setOpen={setIsSuccessOpen}
      />
    </Card>
  );
};

export default PatientsRequestList;
