import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { appointmentsThunks } from "@/lib/features/appointments/appointmentsThunks";
import { StatCard } from "@/components/StatCard";
import { ContentLayout } from "@/components/admin/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import DoctorChart from "./DoctorChart";
import PatientsRequestList from "./PatientsRequestList";
import Image from "next/image";
import { DialogOverlay } from "../ui/dialog";

const DoctorLandingPage = () => {
  const { appointments } = useAppSelector((state) => state.appointments);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appointmentsThunks.getRecentAppointmentList());
  }, [dispatch]);

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <main className="flex gap-6 lg:gap-4 lg:flex-row flex-col">
        <div className="space-y-4 mt-5 w-full">
          <Card>
            <div className="w-full flex gap-5 lg:h-52 h-[400px] items-center flex-col lg:flex-row justify-between overflow-hidden">
              <CardContent className="p-5 lg:text-left text-center space-y-4">
                <h1 className="text-3xl font-semibold">
                  Hello <span className="text-primary">John Doe!</span>
                </h1>
                <p className="text-muted-foreground">
                  You have got 3 new requests from patient{" "}
                </p>

                <Button size={"lg"}>Check request</Button>
              </CardContent>

              <div className="hero-img w-full sm:w-[300px] ">
                <Image
                  src={"/assets/images/hero-img.png"}
                  alt="hero-img"
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </Card>

          <section className="flex gap-4 items-center lg:flex-row flex-col">
            <div className="flex gap-4 items-center lg:w-1/2 w-full">
              <StatCard
                type="appointments"
                label="Total earnings"
                icon={"/assets/icons/appointments.svg"}
              />
              <StatCard
                type="pending"
                label="Total Patient"
                icon={"/assets/icons/pending.svg"}
              />
            </div>

            <div className="flex gap-4 items-center lg:w-1/2 w-full">
              <StatCard
                type="cancelled"
                label="Total Appointments"
                icon={"/assets/icons/cancelled.svg"}
              />
              <StatCard
                type="completed"
                label="Total Requests"
                icon={"/assets/icons/arrow.svg"}
              />
            </div>
          </section>

          <DoctorChart />

          <PatientsRequestList />

          {/* <DataTable columns={columns} data={appointments} /> */}
        </div>

        <Card>
          <CardContent className="space-y-4 p-6 w-full">
            <h1 className="text-lg font-bold ">Upcoming Appointments</h1>
            <p className="text-muted-foreground">
              You have got 3 new requests from patient{" "}
            </p>

            <Button>Check request</Button>
          </CardContent>
        </Card>
      </main>
    </ContentLayout>
  );
};

export default DoctorLandingPage;
