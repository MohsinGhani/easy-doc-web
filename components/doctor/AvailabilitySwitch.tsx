import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";

export default function AvailabilitySwitch() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [switchState, setSwitchState] = useState<boolean>(user.available);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (user) {
      setSwitchState(user.available);
    }
  }, [user]);

  const handleSwitchChange = (checked: boolean) => {
    setSwitchState(checked);
    setHasInteracted(true);
  };

  useEffect(() => {
    if (!hasInteracted) {
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (user?.userId) {
        console.log("API call with switchState:", switchState);
        dispatch(
          authThunks.updateProfile({
            userId: user.userId,
            updateData: { available: switchState },
          })
        );
      }
    }, 500);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [switchState, user?.userId, dispatch, hasInteracted]);

  return (
    <Switch
      id="available"
      checked={switchState}
      onCheckedChange={handleSwitchChange}
      disabled={loading}
    />
  );
}
