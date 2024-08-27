import * as React from "react";
import type { SVGProps } from "react";
const SvgFinishIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <g fillRule="evenodd" clipRule="evenodd">
      <path fill="#4D77FF" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path fill="#fff" d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8" />
    </g>
  </svg>
);
export default SvgFinishIcon;
