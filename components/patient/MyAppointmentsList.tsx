"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { patientColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";

const MyAppointmentsList = () => {
  const columns = React.useMemo(() => patientColumns(), []);
  const dispatch = useAppDispatch();

  const { allAppointments, loading } = useAppSelector(
    (state) => state.appointment
  );

  const { role, userId } = useAppSelector((state) => state.auth.user);

  React.useEffect(() => {
    // Fetch all appointments
    if (userId && role) {
      dispatch(appointmentThunks.fetchAllAppointments());
    }
  }, [dispatch, userId, role]);

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
    </Card>
  );
};

export default MyAppointmentsList;
