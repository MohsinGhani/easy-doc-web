export enum ApiServiceName {
  FUNCTIONS = "functions",
  APPOINTMENTS = "appointments",
}

export const getServiceUrl = (serviceName: ApiServiceName) => {
  switch (serviceName) {
    case ApiServiceName.FUNCTIONS:
      return process.env.NEXT_PUBLIC_API_URL_FUNCTIONS;
    case ApiServiceName.APPOINTMENTS:
      return process.env.NEXT_PUBLIC_API_URL_APPOINTMENTS;
    default:
      throw new Error(`Unknown service: ${serviceName}`);
  }
};
