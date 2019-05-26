import { css } from '@emotion/core';

export default theme => css`
    .Home {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &__intro {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;

        h1, p {
        font-family: 'IBM Plex Mono', sans-serif;
        font-weight: lighter;
        color: ${theme.color_text};
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        }
    }
}
`