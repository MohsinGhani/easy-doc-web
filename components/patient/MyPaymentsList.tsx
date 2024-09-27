"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { paymentsColumns } from "../table/columns";
import { DataTable } from "../table/data-table";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Loader } from "../common/Loader";
import { paymentThunks } from "@/lib/features/payment/paymentThunks";

const MyPaymentsList = () => {
  const columns = React.useMemo(() => paymentsColumns(), []);
  const dispatch = useAppDispatch();

  const { allPayments, loading } = useAppSelector((state) => state.payment);

  const { role, userId } = useAppSelector((state) => state.auth.user);

  React.useEffect(() => {
    // Fetch all appointments
    if (userId && role) {
      dispatch(paymentThunks.fetchAllPayments());
    }
  }, [dispatch, userId, role]);

  if (loading) return <Loader />;

  return (
    <Card>
      <CardContent>
        <DataTable columns={columns} data={allPayments} title="My Payments" />
      </CardContent>
    </Card>
  );
};

export default MyPaymentsList;
