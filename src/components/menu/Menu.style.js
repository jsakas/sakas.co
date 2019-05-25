import { css } from '@emotion/core';
import { rgba } from 'polished';

export default theme => css`
    .Menu {
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 3rem;
        color: $color-text;
        z-index: 20;
        transition: all .2s;
        display: flex;
    
        &--closed {
            bottom: -3rem;
        }
    
        @media print {
            display: none;
        }
    }
    
    .MenuItem {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        background: ${rgba(theme.color_secondary, .2)};
        transition: background .2s;
        cursor: pointer;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        text-transform: uppercase;
        font-size: .8rem;
        letter-spacing: .3rem;
    
        &:hover {
            background: ${rgba(theme.color_secondary, .4)};
        }
    
        &__icon {
            display: none;
        }
    
        @media screen and (max-width: ${theme.color_secondary}) {
            &__text {
                display: none;
            }

            &__icon {
                width: 1.5rem;
                height: 1.5rem;
                fill: #fff;
                pointer-events: none;
            }
        }
    }
`;