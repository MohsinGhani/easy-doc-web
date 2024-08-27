import * as React from "react";
import type { SVGProps } from "react";
const SvgCrown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 22 23"
    {...props}
  >
    <path
      fill="#EDA122"
      d="M11 .5C4.935.5 0 5.435 0 11.5s4.935 11 11 11 11-4.934 11-11-4.934-11-11-11m6.407 9.207-.997 5.805a.69.69 0 0 1-.677.571H6.267a.69.69 0 0 1-.677-.57l-.997-5.806a.687.687 0 0 1 .98-.734l2.652 1.291L10.4 6.353c.242-.437.96-.437 1.201 0l2.175 3.911 2.652-1.291a.687.687 0 0 1 .979.734"
    />
  </svg>
);
export default SvgCrown;
