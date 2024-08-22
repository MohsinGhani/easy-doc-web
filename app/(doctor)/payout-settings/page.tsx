"use client";

import EditPaymentMethodForm from "@/components/EditPaymentMethodForm";
import { ContentLayout } from "@/components/layout/content-layout";
import PaymentMethodForm from "@/components/PaymentMethodForm";
import { paymentsColumns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Payment } from "@/types/table";
import Image from "next/image";
import { useMemo } from "react";

const paymentsData: Payment[] = [
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$100",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$200",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$30",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$50",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$70",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$150",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$250",
  },
  {
    method: "stripe",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$300",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$400",
  },
  {
    method: "stripe",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$500",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$600",
  },
  {
    method: "stripe",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$700",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$800",
  },
  {
    method: "stripe",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$900",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1000",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1100",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1200",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1300",
  },
  {
    method: "paypal",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1400",
  },
  {
    method: "visa",
    id: `${Math.floor(Math.random() * 10000) + 1}`,
    scheduledDate: {
      from: new Date(Date.now() - Math.random() * (24 * 60 * 60 * 1000)),
      to: new Date(
        Date.now() - Math.random() * (24 * 60 * 60 * 1000) + 30 * 60 * 1000
      ),
    },
    amount: "$1500",
  },
];

export default function PaymentsPage() {
  const columns = useMemo(() => paymentsColumns(), []);

  return (
    <ContentLayout title="Doctor | Patient's Requests">
      <Card className="@container">
        <CardHeader className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-medium">Select Payout Method</h3>
              <p className="text-muted-foreground text-base">
                All the earning will be sent to below selected payout method
              </p>
            </div>

            <PaymentMethodForm />
          </div>

          <RadioGroup className="w-[80%] lg:w-[65%] grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 min-h-[132px]">
            {["stripe", "paypal", "visa"].map((v, i) => (
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
                    src={`/assets/icons/intersect (${i}).svg`}
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
            data={paymentsData}
            isPrimaryHeader={true}
            title="Payments"
            searchKey="id"
          />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}