import * as React from "react";
import type { SVGProps } from "react";
const SvgPending = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#79B5EC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m16 16-5.697-4.748c-.846-.705-1.27-1.058-1.574-1.49a4 4 0 0 1-.591-1.263C8 7.989 8 7.437 8 6.336v-3.67M16 16l5.697-4.748c.847-.705 1.27-1.058 1.574-1.49a4 4 0 0 0 .592-1.263C24 7.989 24 7.437 24 6.336v-3.67M16 16l-5.697 4.747c-.846.706-1.27 1.059-1.574 1.49a4 4 0 0 0-.591 1.264C8 24.01 8 24.562 8 25.664v3.67M16 16l5.697 4.747c.847.706 1.27 1.059 1.574 1.49a4 4 0 0 1 .592 1.264c.137.51.137 1.061.137 2.163v3.67M5.334 2.666h21.333M5.334 29.333h21.333"
    />
  </svg>
);
export default SvgPending;
