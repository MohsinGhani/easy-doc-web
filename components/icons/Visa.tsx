import * as React from "react";
import type { SVGProps } from "react";
const SvgVisa = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 86 36"
    {...props}
  >
    <path fill="url(#visa_svg__a)" d="M0 0h85.787v36H0z" />
    <defs>
      <pattern
        id="visa_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use
          xlinkHref="#visa_svg__b"
          transform="matrix(.00195 0 0 .0047 0 -.718)"
        />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="visa_svg__b"
        width={512}
        height={512}
      />
    </defs>
  </svg>
);
export default SvgVisa;
