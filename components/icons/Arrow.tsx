import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      stroke="#24AE7C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m5.833 10 2.778-3.333M5.833 10l2.778 3.333M5.833 10h8.334"
    />
  </svg>
);
export default SvgArrow;
