import * as React from "react";
import type { SVGProps } from "react";
const SvgGoogle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 29 28"
    {...props}
  >
    <g clipPath="url(#google_svg__a)">
      <path
        fill="#4285F4"
        d="M28.227 14.323c0-.952-.077-1.909-.242-2.845H14.78v5.39h7.562a6.48 6.48 0 0 1-2.798 4.255v3.498h4.511c2.65-2.438 4.172-6.039 4.172-10.298"
      />
      <path
        fill="#34A853"
        d="M14.78 28c3.776 0 6.96-1.239 9.28-3.379l-4.511-3.498c-1.255.854-2.876 1.338-4.764 1.338-3.652 0-6.749-2.464-7.86-5.777H2.269v3.606A14 14 0 0 0 14.78 28"
      />
      <path
        fill="#FBBC04"
        d="M6.92 16.684a8.4 8.4 0 0 1 0-5.36V7.716H2.27a14.01 14.01 0 0 0 0 12.573z"
      />
      <path
        fill="#EA4335"
        d="M14.78 5.541a7.6 7.6 0 0 1 5.37 2.1l3.998-3.998A13.46 13.46 0 0 0 14.78.001 14 14 0 0 0 2.27 7.717l4.65 3.606c1.106-3.318 4.208-5.782 7.86-5.782"
      />
    </g>
    <defs>
      <clipPath id="google_svg__a">
        <path fill="#fff" d="M.5 0h28v28H.5z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgGoogle;
