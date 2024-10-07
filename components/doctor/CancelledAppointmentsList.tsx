"use client";

import * as React from "react";
import { cancelledColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { appointmentThunks } from "@/lib/features/appointment/appointmentThunks";
import { Loader } from "../common/Loader";

const CancelledAppointmentsList = () => {
  const dispatch = useAppDispatch();
  const columns = React.useMemo(() => cancelledColumns(), []);

  const { role, userId } = useAppSelector((state) => state.auth.user);
  const { allAppointments, lastEvaluatedKey, loading } = useAppSelector(
    (state) => state.appointment
  );

  React.useEffect(() => {
    if (userId && role) {
      dispatch(
        appointmentThunks.fetchAllAppointments({
          status: "CANCELLED",
        })
      );
    }
  }, [dispatch, userId, role]);

  const handlePageChange = () => {
    dispatch(
      appointmentThunks.fetchAppointmentsByPagination({
        startKey: lastEvaluatedKey,
        status: "CANCELLED",
      })
    );
  };

  if (loading) <Loader />;

  return (
    <DataTable
      columns={columns}
      data={allAppointments}
      title="Cancelled Appintments"
      onPageChange={handlePageChange}
      loading={loading}
    />
  );
};

export default CancelledAppointmentsList;
