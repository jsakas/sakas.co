import { css } from '@emotion/core';

export default theme => css`
    .Canvas {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
        opacity: 1;
        transition: opacity .2s;
    }

    &--loading &__loader {
        opacity: 1;
    }

    &--loading canvas {
        opacity: 0;
    }

    &__loader {
        opacity: 0;
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-top: .1rem solid ${theme.color_canvas_loader_1};
        border-right: .1rem solid ${theme.color_canvas_loader_2};
        border-bottom: .1rem solid ${theme.color_canvas_loader_2};
        border-left: .1rem solid ${theme.color_canvas_loader_2};
        border-radius: 50%;
        animation-name: spin;
        animation-iteration-count: infinite;
        animation-duration: 3s;
        animation-timing-function: linear;
        transition: opacity .2s;

        @keyframes spin  {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
            }
        }
    }
`;