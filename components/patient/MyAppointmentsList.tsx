"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { patientColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import AppointmentDetailsSheet from "./AppointmentDetailsSheet";
import { useSearchParams } from "next/navigation";

const MyAppointmentsList = () => {
  const dispatch = useAppDispatch();

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const searchParams = useSearchParams();

  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);
  const { allAppointments, lastEvaluatedKey, loading, fetchedAppointment } =
    useAppSelector((state) => state.appointment);

  const user = useAppSelector((state) => state.auth.user);
  const { role, userId } = user;

  const handlePreview = (request: Appointment) => {
    setSelectedAppointment(request);
    setIsPreviewOpen(true);
  };

  const handleCancel = async (request: Appointment) => {
    await dispatch(
      appointmentThunks.updateAppointmentStatus({
        appointmentId: request.appointmentId,
        status: "CANCELLED",
      })
    );
  };

  const columns = React.useMemo(
    () => patientColumns({ handlePreview, handleCancel }),
    []
  );

  React.useEffect(() => {
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments({ status: "UPCOMING" }));
    }
  }, [dispatch, userId, role]);

  React.useEffect(() => {
    const selectedAppointmentId = searchParams.get("selectedAppointment");

    if (selectedAppointmentId) {
      dispatch(appointmentThunks.fetchAppointmentById(selectedAppointmentId));
    }

    setIsPreviewOpen(true);
  }, [searchParams, dispatch]);

  React.useEffect(() => {
    setSelectedAppointment(fetchedAppointment);
  }, [fetchedAppointment]);

  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAppointmentsByPagination({
        startKey: lastEvaluatedKey,
      })
    );
  };

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={allAppointments}
          title="My Appointments"
          onPageChange={handlePageChange}
          lastEvaluatedKey={lastEvaluatedKey}
          loading={loading}
        />
      </CardContent>

      <AppointmentDetailsSheet
        open={isPreviewOpen}
        setOpen={setIsPreviewOpen}
        selectedAppointment={selectedAppointment}
      />
    </Card>
  );
};

export default MyAppointmentsList;
