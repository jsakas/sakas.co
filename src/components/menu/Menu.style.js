import { css } from '@emotion/core';

export default theme => css`
    .Menu {
        position: absolute;
        bottom: 0;
        width: 100vw;
        height: 3rem;
        color: ${theme.color_menu_text};
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
        background: ${theme.color_menu_bg};
        transition: background .2s;
        cursor: pointer;
        font-family: ${theme.font_primary};
        font-weight: 300;
        text-transform: uppercase;
        font-size: .8rem;
        letter-spacing: .3rem;
    
        &:hover {
            background: ${theme.color_menu_bg_hover};
        }
    
        &__icon {
            display: none;
        }
    
        @media screen and (max-width: ${theme.breakpoint_resume}) {
            &__text {
                display: none;
            }

            &__icon {
                width: 1.5rem;
                height: 1.5rem;
                fill: #fff;
                pointer-events: none;
                display: block;
            }
        }
    }
`;