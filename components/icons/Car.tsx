import * as React from "react";
import type { SVGProps } from "react";
const SvgCar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 25 25"
    {...props}
  >
    <g clipPath="url(#Car_svg__a)">
      <path
        stroke="#4D77FF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21.178 12.208a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9l-5.7 1.9 1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"
      />
    </g>
    <defs>
      <clipPath id="Car_svg__a">
        <path fill="#fff" d="M.5.25h24v24H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCar;
