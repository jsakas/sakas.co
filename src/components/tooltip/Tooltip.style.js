import { css } from '@emotion/core';

export default css`
    .Tooltip {
        position: relative;

        &:hover &__content {
            opacity: 1;
            bottom: -3rem;
        }

        &__content {
            pointer-events: none;
            transition: .2s opacity, .2s bottom;
            font-size: .75rem;
            opacity: 0;
            position: absolute;
            z-index: 10;
            bottom: -3.5rem;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, .75);
            border-radius: .25rem;
            padding: .5rem;
            text-align: center;
            min-width: 10rem;
        }
    }
`;
