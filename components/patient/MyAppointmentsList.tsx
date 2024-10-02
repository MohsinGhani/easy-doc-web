"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { patientColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import AppointmentDetailsSheet from "./AppointmentDetailsSheet";

const MyAppointmentsList = () => {
  const dispatch = useAppDispatch();

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  const { allAppointments, lastEvaluatedKey, loading } = useAppSelector(
    (state) => state.appointment
  );

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

  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAppointmentsByPagination({
        startKey: lastEvaluatedKey,
      })
    );
  };

  if (loading) return <Loader />;

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={allAppointments.map((appointment) => ({
            ...appointment,
            patient: user,
          }))}
          title="My Appointments"
          onPageChange={handlePageChange}
          lastEvaluatedKey={lastEvaluatedKey}
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
