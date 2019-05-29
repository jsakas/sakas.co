import { css } from '@emotion/core';

export default theme => css`
    .ProjectView {
        position: relative;
        margin: 0 auto;
        max-width: 80rem;
        overflow: auto;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 2rem;

        h2 {
            font-weight: 300;
            color: ${theme.color_exp_title};
        }
    }
`;