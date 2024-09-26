"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import RequestReviewSheet from "./RequestReviewSheet";
import SuccessPage from "../SuccessPage";
import { createAppointment, requestsColumns } from "../table/columns";
import { BaseAppointment } from "@/types/table";
import { DataTable } from "../table/data-table";

let approvalRequests: BaseAppointment[] = [];

for (let index = 0; index < 20; index++) {
  const appointment = createAppointment((index + 1).toString(), index + 1);
  approvalRequests.push(appointment);
}

interface PatientsRequestListProps {
  headerType?: "primary" | "secondary";
}

const PatientsRequestList = ({
  headerType = "primary",
}: PatientsRequestListProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] =
    React.useState<BaseAppointment | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const isPrimaryHeader = headerType === "primary";

  const handlePreview = (request: BaseAppointment) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const handleAcceptRequest = (request: BaseAppointment) => {
    setIsSuccessOpen(true);
  };

  const columns = React.useMemo(
    () =>
      requestsColumns({
        handleAcceptRequest,
        handlePreview,
      }),
    []
  );

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
