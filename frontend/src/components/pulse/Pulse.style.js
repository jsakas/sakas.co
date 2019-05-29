import { css } from '@emotion/core';

export default css`
    .Pulse {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        cursor: pointer;

        &__circle {
            background: #fff;
            width: .25rem;
            height: .25rem;
            border-radius: 50%;
            cursor: pointer;
            position: absolute;
        }

        &__pulse {
            background: rgba(255, 255, 255, .3);
            border-radius: 50%;
            cursor: pointer;
            position: absolute;

            animation-name: pulse;
            animation-iteration-count: infinite;
            animation-duration: 2s;
        }
    }

    @keyframes pulse {
        0% {
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, .3);
        }

        100% {
            width: 2rem;
            height: 2rem;
            background: rgba(255, 255, 255, 0);
        }
    }
`;
