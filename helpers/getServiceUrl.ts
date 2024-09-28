export enum ApiServiceName {
  FUNCTIONS = "functions",
  APPOINTMENTS = "appointments",
  PAYMENTS = "payments",
}

export const getServiceUrl = (serviceName: ApiServiceName) => {
  switch (serviceName) {
    case ApiServiceName.FUNCTIONS:
      return process.env.NEXT_PUBLIC_API_URL_FUNCTIONS;
    case ApiServiceName.APPOINTMENTS:
      return process.env.NEXT_PUBLIC_API_URL_APPOINTMENTS;
    case ApiServiceName.PAYMENTS:
      return process.env.NEXT_PUBLIC_API_URL_PAYMENTS;
    default:
      throw new Error(`Unknown service: ${serviceName}`);
  }
};
