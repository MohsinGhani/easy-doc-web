import {
  SelectRoleForm,
  PersonalDetailsForm,
  EnterOtpForm,
} from "@/components/auth";
import EnterEmailForResetForm from "@/components/auth/EnterEmailForResetForm";
import EnterNewPasswordForm from "@/components/auth/EnterNewPasswordForm";

export function getSignupFormContent(step: number, destination?: string) {
  switch (step) {
    case 0:
      return <SelectRoleForm />;
    case 1:
      return <PersonalDetailsForm />;
    case 2:
      return <EnterOtpForm destination={destination} />;
    default:
      return null;
  }
}

export function getResetFormContent(step: number) {
  switch (step) {
    case 0:
      return <EnterEmailForResetForm />;
    case 1:
      return <EnterNewPasswordForm />;
    default:
      return null;
  }
}
