import React, { useCallback, useState } from "react";
import { Clock3, X } from "lucide-react";
import DeleteDialog from "../common/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";
import _ from "lodash";
import { formatTimeForUI } from "@/lib/utils";

const TimeSlot = ({
  startTime,
  endTime,
  dayIndex,
  slotIndex,
}: {
  startTime: string;
  endTime: string;
  dayIndex: number;
  slotIndex: number;
}) => {
  const { availableDays, userId } = useAppSelector((state) => state.auth.user);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const handleReject = useCallback(async () => {
    let updatedData = _.cloneDeep(availableDays);

    if (dayIndex === -1 || slotIndex === -1) {
      return;
    }

    if (updatedData[dayIndex].slots.length === 1) {
      updatedData[dayIndex].slots = [];
    } else {
      updatedData[dayIndex].slots.splice(slotIndex, 1);
    }

    await dispatch(
      authThunks.updateProfile({
        userId,
        updateData: {
          availableDays: {
            value: updatedData,
            replace: true,
          },
        },
      })
    );
  }, [availableDays, dayIndex, slotIndex, userId, dispatch]);

  return (
    <div
      className="relative flex items-center p-2 gap-1 border rounded-md font-semibold transition-all duration-300 bg-secondary border-stone-600/30 hover:bg-gray-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Clock3 className="w-3.5 h-3" />
      <p className="text-sm transition-all duration-300 whitespace-nowrap">
        {`${formatTimeForUI(startTime)} - ${formatTimeForUI(endTime)}`}
      </p>
      {isHovered && (
        <DeleteDialog
          trigger={
            <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8 h-full bg-red-500 rounded-r-md cursor-pointer opacity-100">
              <X className="w-4 h-4 text-white" />
            </div>
          }
          text="Your this slot will be deleted"
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default React.memo(TimeSlot);
