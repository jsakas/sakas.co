import { css } from '@emotion/core';

export default css`
    .ErrorBoundary {
        text-align: center;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &__emoji {
            font-size: 5rem;
            line-height: 5rem;
            margin: 0;
        }
    }
`;