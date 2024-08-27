import * as React from "react";
import type { SVGProps } from "react";
const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 40 40"
    {...props}
  >
    <rect width={40} height={40} fill="#2D3136" rx={20} />
    <path
      stroke="#6225C5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M16.667 23.333 20 20m0 0 3.333 3.333M20 20v7.5m6.666-3.548a4.583 4.583 0 0 0-2.917-8.12.52.52 0 0 1-.444-.25 6.25 6.25 0 1 0-9.816 7.58"
    />
  </svg>
);
export default SvgUpload;
