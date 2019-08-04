
import { css } from '@emotion/core';
import { animateOnce } from '@styles/mixins';

export default () => css`
    .Headshot {
      display: block;
      position: relative;
      opacity: 0;
      ${animateOnce('fade-in', '1s', '0s')};

      &__svg,
      &__img {
        width: 100%;
        height: auto;
        position: absolute;
        top: 0;
        transform-origin: center;
      }

      &__svg {
        overflow: visible;
      }

      &__img {
        opacity: 0;
      }
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }
`;
