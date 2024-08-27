import * as React from "react";
import type { SVGProps } from "react";
const SvgCheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 164 164"
    {...props}
  >
    <g filter="url(#check-circle_svg__a)">
      <path
        stroke="#4AC97E"
        strokeLinecap="round"
        strokeWidth={5}
        d="m65.333 72 9.554 9.554a4.167 4.167 0 0 0 5.893 0l17.887-17.887M119.5 72c0 20.71-16.789 37.5-37.5 37.5S44.5 92.71 44.5 72 61.29 34.5 82 34.5s37.5 16.79 37.5 37.5Z"
      />
    </g>
    <defs>
      <filter
        id="check-circle_svg__a"
        width={184}
        height={184}
        x={-10}
        y={-10}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          radius={4}
          result="effect1_dropShadow_4311_819"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={13} />
        <feColorMatrix values="0 0 0 0 0.290196 0 0 0 0 0.788235 0 0 0 0 0.494118 0 0 0 0.16 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_4311_819"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feMorphology
          in="SourceAlpha"
          radius={3}
          result="effect2_dropShadow_4311_819"
        />
        <feOffset dy={10} />
        <feGaussianBlur stdDeviation={22.5} />
        <feColorMatrix values="0 0 0 0 0.290196 0 0 0 0 0.788235 0 0 0 0 0.494118 0 0 0 0.3 0" />
        <feBlend
          in2="effect1_dropShadow_4311_819"
          result="effect2_dropShadow_4311_819"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect2_dropShadow_4311_819"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgCheckCircle;
