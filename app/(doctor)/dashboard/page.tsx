import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { StatCard } from "@/components/StatCard";
import { Calendar, DoctorCap, People } from "@/components/icons";
import DoctorChart from "@/components/doctor/DoctorChart";
import PatientsRequestList from "@/components/doctor/PatientsRequestList";
import PatientsReviewsList from "@/components/doctor/PatientsReviewsList";
import SecondaryUpcomingAppointmentsList from "@/components/doctor/SecondaryUpcomingAppointmentList";
import MessagesSidebar from "@/components/messages/messages-sidebar";
import { ContentLayout } from "@/components/layout/content-layout";

const DoctorDashboardPage = () => {
  return (
    <ContentLayout title="Doctor | Dashboard">
      <main className="flex gap-6 lg:gap-4 lg:flex-row flex-col">
        <div className="space-y-4 lg:w-[70%] w-full">
          <Card className="w-full flex gap-5 items-center flex-col lg:flex-row justify-between overflow-hidden">
            <CardContent className="p-5 lg:text-left text-center space-y-4 lg:flex-1">
              <h1 className="text-3xl font-semibold">
                Hello <span className="text-primary">John Doe!</span>
              </h1>
              <p className="text-muted-foreground">
                You have got 3 new requests from patient{" "}
              </p>

              <Link
                href={"/patients-requests"}
                className={cn(buttonVariants({ size: "lg" }))}
              >
                Check request
              </Link>
            </CardContent>

            <div className="hero-img w-full max-w-xs flex justify-center lg:self-end">
              <Image
                src={"/assets/images/hero-img.png"}
                alt="hero-img"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
          </Card>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-4 sm:grid-cols-2">
            <StatCard
              type="appointments"
              label="Total earnings"
              icon={<DoctorCap className="w-10 h-10 fill-white" />}
            />
            <StatCard
              type="pending"
              label="Total Patient"
              icon={<Calendar className="w-8 h-10 fill-white" />}
            />
            <StatCard
              type="cancelled"
              label="Total Appointments"
              icon={<People className="w-8 h-10 fill-white" />}
            />
            <StatCard
              type="completed"
              label="Total Requests"
              icon={<Calendar className="w-8 h-10 fill-white" />}
            />
          </section>

          <DoctorChart />

          <PatientsRequestList headerType={"secondary"} />

          <PatientsReviewsList viewAll={true} />
        </div>

        <div className="lg:w-[30%] w-full space-y-6">
          <SecondaryUpcomingAppointmentsList />

          <MessagesSidebar
            className="w-full flex min-h-[500px]"
            navigate={false}
          />
        </div>
      </main>
    </ContentLayout>
  );
};

export default DoctorDashboardPage;
