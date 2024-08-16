export interface SignupPayload {
  given_name: string;
  family_name: string;
  email: string;
  password: string;
  role: string;
  licence?: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface ConfirmCodePayload {
  confirmationCode: string;
  email: string;
  password: string;
}

export interface ResendConfirmationCodePayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
}

export interface ConfirmResetPasswordPayload {
  code: string;
  email: string;
  newPassword: string;
}
