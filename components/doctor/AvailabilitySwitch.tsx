import { useState, useEffect, useCallback } from "react";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";

export default function AvailabilitySwitch() {
  const [switchState, setSwitchState] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState(switchState);
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(switchState);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [switchState]);

  const updateAvailability = useCallback(() => {
    if (user?.userId) {
      console.log("API call with debounced value:", debouncedValue);

      dispatch(
        authThunks.updateProfile({
          userId: user?.userId || "",
          updateData: { available: debouncedValue },
        })
      );
    }
  }, [debouncedValue, user?.userId, dispatch]);

  // Effect to trigger API call when the debounced value changes
  useEffect(() => {
    // Avoid making the API call on the first render
    if (debouncedValue === switchState) {
      updateAvailability();
    }
  }, [debouncedValue, updateAvailability]);

  return (
    <Switch
      id="available"
      checked={switchState}
      onCheckedChange={setSwitchState}
      disabled={loading}
    />
  );
}
