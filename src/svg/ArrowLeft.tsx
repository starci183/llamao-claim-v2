import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={9}
    fill="none"
    {...props}
  >
    <g fill="#000" clipPath="url(#arrow_left_svg__a)">
      <path d="M5.716 7.772h-.92V.416h.92zM4.796 6.853h-.92V1.336h.92z" />
      <path d="M3.877 5.474h-.92v-2.76h.92zM2.957 4.555h-.92v-.92h.92z" />
    </g>
    <defs>
      <clipPath id="arrow_left_svg__a">
        <path fill="#fff" d="M8.092 8.309H.276V.493h7.816z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowLeft;
