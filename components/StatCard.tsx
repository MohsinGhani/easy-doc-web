import { Card, CardContent } from "./ui/card";
import { DoctorCap } from "./icons";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled" | "completed";
  label: string;
  icon: JSX.Element;
};

export const StatCard = ({ label, icon, type }: StatCardProps) => {
  return (
    <Card className="w-full h-full">
      <CardContent className="flex w-full items-start flex-col gap-3 min-h-24 h-full xl:p-6 lg:p-4 md:p-3 p-2">
        <h4 className="lg:text-sm text-[12px]">{label}</h4>
        <div className="flex w-full items-center justify-between mt-auto gap-2">
          <h4 className="font-semibold sm:text-lg text-sm">
            ${Math.floor(Math.random() * 1000)}
          </h4>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
