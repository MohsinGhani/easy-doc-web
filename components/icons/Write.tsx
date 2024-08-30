import * as React from "react";
import type { SVGProps } from "react";
const SvgWrite = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#71717A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 14.344h7.023M9.652 2.777l-7.435 7.435c-.544.544-.974 1.205-1.104 1.963-.133.766-.177 1.716.277 2.17.453.452 1.403.408 2.169.276.758-.13 1.419-.56 1.963-1.104l7.435-7.435M9.652 2.777s2.479-2.479 4.131-.826c1.652 1.652-.826 4.131-.826 4.131M9.652 2.777l3.305 3.305"
    />
  </svg>
);
export default SvgWrite;
