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
  const columns = React.useMemo(() => patientColumns({ handlePreview }), []);
  const dispatch = useAppDispatch();

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    React.useState<Appointment | null>(null);

  const { allAppointments, loading } = useAppSelector(
    (state) => state.appointment
  );

  const { role, userId } = useAppSelector((state) => state.auth.user);

  React.useEffect(() => {
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments());
    }
  }, [dispatch, userId, role]);

  const handlePreview = (request: Appointment) => {
    setSelectedAppointment(request);
    setIsPreviewOpen(true);
  };

  if (loading) return <Loader />;

  return (
    <Card>
      <CardContent>
        <DataTable
          columns={columns}
          data={allAppointments}
          title="My Appointments"
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
