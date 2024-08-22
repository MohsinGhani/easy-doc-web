import { StatCard } from "@/components/StatCard";
import { ContentLayout } from "@/components/layout/content-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DoctorChart from "@/components/doctor/DoctorChart";
import PatientsRequestList from "@/components/doctor/PatientsRequestList";
import Image from "next/image";
import PatientsReviewsList from "@/components/doctor/PatientsReviewsList";
import MessagesSidebar from "@/components/messages/messages-sidebar";

const DoctorDashboardPage = () => {
  return (
    <ContentLayout title="Doctor | Dashboard">
      <main className="flex gap-6 lg:gap-4 lg:flex-row flex-col">
        <div className="space-y-4 lg:w-[70%] w-full">
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

          <PatientsRequestList headerType={"secondary"} />

          <PatientsReviewsList viewAll={true} />
        </div>

        <div className="lg:w-[30%] w-full">
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
