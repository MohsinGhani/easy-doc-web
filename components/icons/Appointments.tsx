import * as React from "react";
import type { SVGProps } from "react";
const SvgAppointments = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#FFD147"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M28 13.333H4m24 3.333v-4.933c0-2.24 0-3.36-.436-4.216a4 4 0 0 0-1.748-1.748c-.856-.436-1.976-.436-4.216-.436H10.4c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C4 8.373 4 9.493 4 11.733v11.2c0 2.24 0 3.36.436 4.216a4 4 0 0 0 1.748 1.748c.856.436 1.976.436 4.216.436H16m5.333-26.666V8M10.667 2.667V8m8.666 17.333L22 28l6-6"
    />
  </svg>
);
export default SvgAppointments;
