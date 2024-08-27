import * as React from "react";
import type { SVGProps } from "react";
const SvgCancelled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#FF4F4E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M16 12v5.333m0 5.334h.013m-1.86-17.478L3.187 24.13c-.609 1.05-.913 1.576-.868 2.007.04.376.237.718.542.94.35.255.958.255 2.172.255h21.933c1.214 0 1.821 0 2.172-.255.305-.222.502-.564.542-.94.045-.431-.26-.956-.868-2.007L17.846 5.189c-.606-1.047-.91-1.57-1.305-1.746a1.33 1.33 0 0 0-1.083 0c-.396.175-.699.699-1.305 1.746"
    />
  </svg>
);
export default SvgCancelled;
