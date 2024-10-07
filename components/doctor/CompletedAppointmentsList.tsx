"use client";

import * as React from "react";
import { completedColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { Loader } from "../common/Loader";

const CompletedAppointmentsList = () => {
  const dispatch = useAppDispatch();
  const columns = React.useMemo(() => completedColumns(), []);

  const { role, userId } = useAppSelector((state) => state.auth.user);
  const { allAppointments, lastEvaluatedKey, loading } = useAppSelector(
    (state) => state.appointment
  );

  React.useEffect(() => {
    if (userId && role) {
      dispatch(
        appointmentThunks.fetchAllAppointments({
          status: "COMPLETED",
        })
      );
    }
  }, [dispatch, userId, role]);

  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAppointmentsByPagination({
        startKey: lastEvaluatedKey,
        status: "COMPLETED",
      })
    );
  };

  if (loading) <Loader />;

  return (
    <DataTable
      columns={columns}
      data={allAppointments}
      title="Completed Appintments"
      onPageChange={handlePageChange}
      loading={loading}
    />
  );
};

export default CompletedAppointmentsList;
