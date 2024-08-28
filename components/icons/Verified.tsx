import * as React from "react";
import type { SVGProps } from "react";
const SvgVerified = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="#5ccc3e"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="verified_svg__lucide verified_svg__lucide-badge-check"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
export default SvgVerified;