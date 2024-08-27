import * as React from "react";
import type { SVGProps } from "react";
const SvgPng = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 35 35"
    {...props}
  >
    <g
      stroke="#5C5C5B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="M27.664 4.432H7.336a2.904 2.904 0 0 0-2.904 2.904v20.328c0 1.604 1.3 2.904 2.904 2.904h20.328c1.604 0 2.904-1.3 2.904-2.904V7.336c0-1.604-1.3-2.904-2.904-2.904" />
      <path d="M12.417 14.596a2.178 2.178 0 1 0 0-4.356 2.178 2.178 0 0 0 0 4.356M30.567 21.856l-7.26-7.26L7.335 30.568" />
    </g>
  </svg>
);
export default SvgPng;
