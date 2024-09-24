import { useAppSelector } from "@/lib/hooks";
import { TabsContent } from "@/components/ui/tabs";
import { Loader } from "@/components/common/Loader";
import { formatTimeForUI } from "@/lib/utils";
import { ControllerRenderProps } from "react-hook-form";
import { CircleCheckBigIcon } from "lucide-react";

interface TabListContentProps {
  day: string;
  dayIndex: number;
  field: ControllerRenderProps<any, string>;
}

const AvailableTimingsTabsContent = ({
  day,
  dayIndex,
  field,
}: TabListContentProps) => {
  const { loading } = useAppSelector((state) => state.auth);
  const { value, onChange } = field;

  const handleTimeSlotChange = (start_time: string, end_time: string) => {
    onChange({
      start_time,
      end_time,
    });
  };

  const { fetchedDoctor, loading: doctorLoader } = useAppSelector(
    (state) => state.doctor
  );

  if (loading || doctorLoader) return <Loader />;

  if (!fetchedDoctor || !fetchedDoctor.availableDays) return null;

  const { availableDays } = fetchedDoctor;

  return (
    <TabsContent value={day} key={dayIndex} className="min-h-96">
      {availableDays[dayIndex]?.slots?.length > 0 ? (
        // TODO: Make this grid to perform well
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto">
          {availableDays[dayIndex]?.slots?.map(
            ({ start_time, end_time }, slotIndex) => (
              <div
                className="border rounded-md p-2 flex items-center justify-center shadow cursor-pointer"
                onClick={() => handleTimeSlotChange(start_time, end_time)}
                key={slotIndex}
              >
                <div className="flex items-center gap-2 min-w-40 max-w-[320px]">
                  <p className="text-sm whitespace-nowrap">
                    {`${formatTimeForUI(start_time)} - ${formatTimeForUI(
                      end_time
                    )}`}
                  </p>

                  {value?.start_time ===
                    availableDays[dayIndex]?.slots[slotIndex]?.start_time &&
                    value?.end_time ===
                      availableDays[dayIndex]?.slots[slotIndex]?.end_time && (
                      <CircleCheckBigIcon className="text-primary w-4 h-4" />
                    )}
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="min-h-96 text-gray-500 flex items-center justify-center w-full h-full">
          No slots available for this day.
        </div>
      )}
    </TabsContent>
  );
};

export default AvailableTimingsTabsContent;
