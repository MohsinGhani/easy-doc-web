import * as React from "react";
import type { SVGProps } from "react";
const SvgAlarmPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 25"
    {...props}
  >
    <path
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21.5a8 8 0 1 0 0-16.001A8 8 0 0 0 12 21.5M5 3.5l-3 3M22 6.5l-3-3M6 19.5l-2 2M18 19.5l2 2"
    />
    <path
      fill="#71717A"
      d="M8.914 14.01v-1.4h6.174v1.4zm2.38-3.934h1.428v6.454h-1.428z"
    />
  </svg>
);
export default SvgAlarmPlus;
