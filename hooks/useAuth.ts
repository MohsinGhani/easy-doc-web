import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { authThunks } from "@/lib/features/auth/authThunks";
import {
  ConfirmCodePayload,
  ConfirmResetPasswordPayload,
  ResendConfirmationCodePayload,
  ResetPasswordPayload,
  SigninPayload,
  SignupPayload,
} from "@/types/auth";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signup = (values: SignupPayload) => {
    dispatch(authThunks.signup({ values }));
  };

  const signin = (values: SigninPayload) => {
    dispatch(authThunks.signin({ values, router }));
  };

  const signout = () => {
    dispatch(authThunks.signout(router));
  };

  const confirmCode = (values: ConfirmCodePayload) => {
    dispatch(authThunks.confirmCode({ values, router }));
  };

  const resendConfirmationCode = (values: ResendConfirmationCodePayload) => {
    dispatch(authThunks.resendConfirmationCode({ values }));
  };

  const resetPassword = (values: ResetPasswordPayload) => {
    dispatch(authThunks.requestPasswordReset({ values, router }));
  };

  const confirmResetPassword = (values: ConfirmResetPasswordPayload) => {
    dispatch(authThunks.confirmPasswordReset({ values, router }));
  };

  return {
    signup,
    signin,
    signout,
    confirmCode,
    resendConfirmationCode,
    resetPassword,
    confirmResetPassword,
  };
};
