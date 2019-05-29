import { css } from '@emotion/core';

export default css`
    .Tooltip {
        position: relative;

        &__content {
            pointer-events: none;
            transition: all .2s;
            font-size: .75rem;
            opacity: 0;
            position: absolute;
            z-index: 10;
            background: rgba(0, 0, 0, .75);
            border-radius: .25rem;
            padding: .5rem;
            text-align: center;
            min-width: 10rem;
            color: #fff;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        &:hover &__content {
            opacity: 1;
        }

        &--bottom &__content {
            top: unset;
            bottom: -3.5rem;
            left: 50%;
            transform: translateX(-50%);
        }

        &--bottom:hover &__content {
            bottom: -3rem;
        }

        &--left &__content {
            transform: translate(-120%, -50%);
        }
        
        &--left:hover &__content {
            transform: translate(-130%, -50%);
        }
    }
`;
