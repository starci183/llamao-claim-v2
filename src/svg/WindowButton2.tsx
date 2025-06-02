import * as React from "react";
import type { SVGProps } from "react";
const SvgWindowButton2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <g filter="url(#Window_Button-2_svg__a)">
      <path fill="silver" d="M0 0h16v16H0z" />
      <path
        fill="#000"
        fillRule="evenodd"
        d="M4 4h2v1.143h1v1.143h2V5.143h1V4h2v1.143h-1v1.143h-1v1.143H9V8.57h1v1.143h1v1.143h1V12h-2v-1.143H9V9.714H7v1.143H6V12H4v-1.143h1V9.714h1V8.571h1V7.43H6V6.286H5V5.143H4z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <filter
        id="Window_Button-2_svg__a"
        width={16}
        height={16}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={2} dy={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.87451 0 0 0 0 0.87451 0 0 0 0 0.87451 0 0 0 1 0" />
        <feBlend in2="shape" result="effect1_innerShadow_2153_2323" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-2} dy={-2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.498039 0 0 0 0 0.498039 0 0 0 0 0.498039 0 0 0 1 0" />
        <feBlend
          in2="effect1_innerShadow_2153_2323"
          result="effect2_innerShadow_2153_2323"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={1} dy={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
        <feBlend
          in2="effect2_innerShadow_2153_2323"
          result="effect3_innerShadow_2153_2323"
        />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1} dy={-1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feBlend
          in2="effect3_innerShadow_2153_2323"
          result="effect4_innerShadow_2153_2323"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgWindowButton2;
