import React from "react";

const SvgComponent = props => {
  // let {
  //   children,
  //   ...rest,
  // }
  return (
    <svg width={694} height={384} {...props}>
    <defs>
      <path id="prefix__a" d="M95 39h501.074v292.009H95z" />
    </defs>
    <g
      transform="translate(1 1)"
      stroke="#8492A5"
      fill="none"
      fillRule="evenodd"
    >
      <path d="M594 0H98C84.504 0 73 11.074 73 24.79v326.238h546V24.79C619 11.073 607.537 0 594 0z" />
      <circle cx={347} cy={19} r={4} />
      <path d="M640.812 382.01H51.288C20.641 382.01 0 371.494 0 367.022v-13.594C0 352.084 1.335 351 2.995 351h686.109c1.662 0 2.999 1.084 2.999 2.428v14.129c-.007 3.535-15.991 14.453-51.291 14.453z" />
      <path d="M.5 365.5h689.743" strokeLinecap="square" />
      <use fillRule="nonzero" xlinkHref="#prefix__a" />
      <path d="M421 352v3.087c0 2.201-4.333 2.866-7.613 2.866H278.815c-3.45 0-7.815-.664-7.815-2.866V352" />
    </g>
  </svg>
  )
};

export default SvgComponent;

