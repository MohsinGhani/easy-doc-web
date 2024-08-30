import * as React from "react";
import type { SVGProps } from "react";
const SvgAlarmCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 25"
    {...props}
  >
    <g
      stroke="#FF8E26"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M12 21.5a8 8 0 1 0 0-16.001A8 8 0 0 0 12 21.5M5 3.5l-3 3M22 6.5l-3-3M6 19.5l-2 2M18 19.5l2 2" />
      <path d="m9 13.5 2 2 4-4" />
    </g>
  </svg>
);
export default SvgAlarmCheck;
