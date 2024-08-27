import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M6.42 4.83a1.125 1.125 0 0 0-1.59 1.59L10.41 12l-5.58 5.58a1.125 1.125 0 1 0 1.59 1.59L12 13.59l5.58 5.58a1.124 1.124 0 1 0 1.59-1.59L13.59 12l5.58-5.58a1.125 1.125 0 0 0-1.59-1.59L12 10.41z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClose;
