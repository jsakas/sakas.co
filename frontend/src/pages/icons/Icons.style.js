import { css } from '@emotion/core';

export default css`
    .Icons {
        position: relative;
        margin: 0 auto;
        max-width: 60rem;
        overflow: auto;

        &__icon {
            width: 5%;
            display: inline-block;
            padding: 10px;
            box-sizing: border-box;
            font-size: 8px;

            svg {
                color: black;
            }
        }
    }
`;
