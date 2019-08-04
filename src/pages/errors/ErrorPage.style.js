import { css } from '@emotion/core';

export default theme => css`
    .Error {
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        &__container {
            width: 100%;
            max-width: 50rem;
            text-align: center;
        }

        h1 {
            font-family: ${theme.font_primary};
            font-weight: lighter;
            font-size: 3rem;
            margin-bottom: .3em;
        }
    }  
`;