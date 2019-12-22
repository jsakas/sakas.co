import { css } from '@emotion/core';

import { animateLoop } from '@styles/mixins';

let base_width = 160;

export default theme => css`
  .Loader {
    opacity: 1;
    width: 2rem;
    height: 2rem;
    stroke-width: .3rem;
    overflow: visible;
    stroke: ${theme.color_primary};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${base_width}px;
    stroke-dashoffset: ${base_width}px;
    fill: none;
    ${animateLoop('load', '4s', '0', 'ease')}
    transition: opacity .2s;

    &--complete {
      opacity: 0;
    }
  }

  @keyframes load {
    0% {
      stroke-dasharray: ${base_width}px;
      stroke-dashoffset: ${base_width}px;
    }

    20%,
    50% {
      stroke-dasharray: ${base_width}px;
      stroke-dashoffset: 0;
    }

    75%,
    100% {
      stroke-dasharray: ${base_width}px;
      stroke-dashoffset: ${-base_width}px;
    }
  }
`;
