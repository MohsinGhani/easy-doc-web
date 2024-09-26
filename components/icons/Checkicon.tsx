import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckicon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 25 25"
    {...props}
  >
    <circle cx={12.5} cy={12.5} r={12} fill="#4D77FF" />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.833 8.5 10.5 15.833 7.167 12.5"
    />
  </svg>
);
export default SvgCheckicon;
