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
    return dispatch(authThunks.signup({ values }));
  };

  const signin = (values: SigninPayload) => {
    return dispatch(authThunks.signin({ values, router }));
  };

  const signout = () => {
    return dispatch(authThunks.signout(router));
  };

  const confirmCode = (values: ConfirmCodePayload) => {
    return dispatch(authThunks.confirmCode({ values, router }));
  };

  const resendConfirmationCode = (values: ResendConfirmationCodePayload) => {
    return dispatch(authThunks.resendConfirmationCode({ values }));
  };

  const resetPassword = (values: ResetPasswordPayload) => {
    return dispatch(authThunks.requestPasswordReset({ values }));
  };

  const confirmResetPassword = (values: ConfirmResetPasswordPayload) => {
    return dispatch(authThunks.confirmPasswordReset({ values, router }));
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
