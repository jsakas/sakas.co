import { css } from '@emotion/core';

export default theme => css`
    .grapher-info {
    position: fixed;
    bottom: 3rem;
    left: 0;
    right: 0;
    padding: 2rem;
    color: ${theme.color_primary};
    width: 100%;
    box-sizing: border-box;
    font-family: ${theme.font_mono};

    input {
        font-family: ${theme.font_mono};
        width: 100%;
        font-size: 1.6rem;
        background: none;
        padding: .4rem 0;
        color: ${theme.color_primary};
        border: 0;
        border-bottom: 1px solid ${theme.color_secondary};
        margin-bottom: .3rem;
        transition: border-bottom .2s;

        &:focus {
            outline: 0;
            border-bottom: 1px solid ${theme.color_primary};
            }
        }
    }
`;