"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import RequestReviewSheet from "./RequestReviewSheet";
import SuccessPage from "../SuccessPage";
import { requestsColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { Loader } from "../common/Loader";

interface PatientsRequestListProps {
  headerType?: "primary" | "secondary";
}

const PatientsRequestList = ({
  headerType = "primary",
}: PatientsRequestListProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedRequest, setSelectedRequest] =
    React.useState<Appointment | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const isPrimaryHeader = headerType === "primary";

  const dispatch = useAppDispatch();
  const { allAppointments, lastEvaluatedKey, loading } = useAppSelector(
    (state) => state.appointment
  );
  const { role, userId } = useAppSelector((state) => state.auth.user);

  const handlePreview = (request: Appointment) => {
    setSelectedRequest(request);
    setIsPreviewOpen(true);
  };

  const handleAcceptRequest = (request: Appointment) => {
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

  React.useEffect(() => {
    if (userId && role) {
      dispatch(
        appointmentThunks.fetchAllAppointments({
          startKey: lastEvaluatedKey,
          limit: 10,
        })
      );
    }
  }, [dispatch, userId, role]);

  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAllAppointments({
        limit: 10,
        startKey: lastEvaluatedKey,
      })
    );
  };

  if (loading) <Loader />;

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={allAppointments}
          isPrimaryHeader={isPrimaryHeader}
          title="Patient's Requests"
          onPageChange={handlePageChange}
          lastEvaluatedKey={lastEvaluatedKey}
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
