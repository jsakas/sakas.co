import { css } from '@emotion/core';
import { lighten } from 'polished';

export default theme => css`
    .ThemeControl {
        position: absolute;
        right: 2rem;
        top: 2rem;
        z-index: 50;

        &__icon {
            pointer-events: all;
            fill: ${theme.color_text};
            width: 1.5rem;
            height: 1.5rem;
            transition: fill .2s;
            display: block;

            &:hover {
                cursor: pointer;
                fill: ${lighten(.2, theme.color_text)}
            }
        }
    }
`;
