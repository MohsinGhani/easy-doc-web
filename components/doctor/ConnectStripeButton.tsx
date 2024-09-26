import { authThunks } from "@/lib/features/auth/authThunks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";

const ConnectStripeButton = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    user: { userId, role, email },
  } = useAppSelector((state) => state.auth);

  const handleConnectStripe = () => {
    if (userId && email && role === "doctor") {
      // Dispatch the action to connect the Stripe account
      dispatch(authThunks.connectStripeAccount({ userId, email }));
    }
  };

  return (
    <Button
      onClick={handleConnectStripe}
      disabled={!userId || role !== "doctor" || loading}
    >
      Connect Stripe Account
    </Button>
  );
};

export default ConnectStripeButton;
