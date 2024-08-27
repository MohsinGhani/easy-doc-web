import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#CDE9DF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M20 10.2H4M15.556 3v3.6M8.444 3v3.6M8.267 21h7.466c1.494 0 2.24 0 2.811-.294.502-.26.91-.672 1.165-1.18.291-.578.291-1.334.291-2.846V9.12c0-1.512 0-2.268-.29-2.846a2.7 2.7 0 0 0-1.166-1.18c-.57-.294-1.317-.294-2.81-.294H8.266c-1.494 0-2.24 0-2.811.294-.502.26-.91.672-1.165 1.18C4 6.852 4 7.608 4 9.12v7.56c0 1.512 0 2.268.29 2.846.256.508.664.92 1.166 1.18.57.294 1.317.294 2.81.294"
    />
  </svg>
);
export default SvgCalendar;
