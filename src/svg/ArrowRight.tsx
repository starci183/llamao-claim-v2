import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={8}
    height={9}
    fill="none"
    {...props}
  >
    <g fill="#000" clipPath="url(#arrow_right_svg__a)">
      <path d="M2.445 1.03h.92v7.356h-.92zM3.365 1.949h.92v5.517h-.92z" />
      <path d="M4.284 3.328h.92v2.759h-.92zM5.204 4.248h.92v.92h-.92z" />
    </g>
    <defs>
      <clipPath id="arrow_right_svg__a">
        <path fill="#fff" d="M.07.493h7.816V8.31H.07z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgArrowRight;
