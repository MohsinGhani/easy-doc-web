import {
  SelectRoleForm,
  PersonalDetailsForm,
  EnterOtpForm,
} from "@/components/auth";

export function getStepContent(step: number, destination?: string) {
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
