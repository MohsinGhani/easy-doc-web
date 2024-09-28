"use client";

import { Loader } from "@/components/common/Loader";
import ConnectStripeButton from "@/components/doctor/ConnectStripeButton";
import EditPaymentMethodForm from "@/components/EditPaymentMethodForm";
import { ContentLayout } from "@/components/layout/content-layout";
import { paymentsColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { authThunks } from "@/lib/features/auth/authThunks";
import { paymentThunks } from "@/lib/features/payment/paymentThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo } from "react";

interface PaymentsPageProps {
  searchParams: {
    stripe_attached: string;
  };
}

const PaymentsPage: React.FC<PaymentsPageProps> = () => {
  const columns = useMemo(() => paymentsColumns(), []);

  const dispatch = useAppDispatch();

  const {
    loading,
    user: { userId, stripe_account_active, role },
  } = useAppSelector((state) => state.auth);
  const { allPayments, loading: paymentLoader } = useAppSelector(
    (state) => state.payment
  );

  useEffect(() => {
    if (userId) {
      dispatch(authThunks.verifyStripeAccount({ doctorId: userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userId && role) {
      dispatch(paymentThunks.fetchAllPayments());
    }
  }, [dispatch, userId, role]);

  if (loading || paymentLoader) <Loader />;

  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <Card className="@container">
        <CardHeader className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="space-y-1 lg:text-left text-center">
              <h3 className="text-xl font-medium">Select Payout Method</h3>
              <p className="text-muted-foreground text-base">
                All the earning will be sent to below selected payout method
              </p>
            </div>

            {!stripe_account_active && <ConnectStripeButton />}
          </div>

          <RadioGroup className="sm:w-[80%] lg:w-[65%] w-full grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 min-h-[132px]">
            {/* {["stripe", "paypal", "visa"].map((v, i) => ( */}
            {["stripe"].map((v, i) => (
              <div
                className="relative flex items-start flex-col justify-between gap-10 flex-1 h-full rounded-2xl border border-zinc-200 p-4"
                key={i}
              >
                <RadioGroupItem
                  value="patient"
                  className="absolute right-3 top-3"
                />

                <div
                  className={cn(
                    "absolute bottom-0 right-0",
                    i === 1 && "right-1"
                  )}
                >
                  <Image
                    src={`/assets/icons/Intersect${i + 1}.svg`}
                    alt={"image"}
                    width={80}
                    height={56}
                  />
                </div>

                <Image
                  src={`/assets/icons/${v}.svg`}
                  alt={"role"}
                  width={80}
                  height={36}
                />

                <EditPaymentMethodForm />
              </div>
            ))}
          </RadioGroup>

          <Separator />
        </CardHeader>
        <CardContent>
          <h2 className="text-xl font-medium mb-5">Payouts</h2>
          <DataTable
            columns={columns}
            data={allPayments}
            isPrimaryHeader={true}
            title="Payments"
            searchKey="id"
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
};

export default PaymentsPage;
