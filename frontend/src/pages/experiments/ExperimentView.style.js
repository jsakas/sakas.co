import { css } from '@emotion/core';

export default theme => css`
    .ExperimentView {
        position: relative;
        margin: 0 auto;
        max-width: 80rem;
        overflow: auto;
        display: flex;
        flex-direction: column;
        height: 100vh;
        padding: 2rem 2rem 5rem;

        h2 {
            font-weight: 300;
            color: ${theme.color_exp_title};
        }

        &__fullscreen {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 9;
        }

        &__iframe {
            overflow: hidden;
            background: #fff;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s;

            &--loaded {
                opacity: 1;
            }

            iframe {
                border: 0;
                width: 100%;
                height: 100%;
            }    
        }

        &__header {
            position: relative;
            z-index: 10;
        }

        &__buttons {
            position: absolute;
            right: 0;
            bottom: 1rem;

            @media screen and (max-width: ${theme.breakpoint_resume}) {
                position: static;
                margin-bottom: 1rem;
            }
        }

        &__button {
            background: ${theme.color_exp_button_bg};
            transition: background .2s;
            color: #fff;
            border-radius: 2rem;
            padding: .5rem 1rem;
            position: relative;
            margin-top: .5rem;
            display: inline-block;
            cursor: pointer;
            font-family: ${theme.font_primary};
            font-weight: 100;
            text-transform: uppercase;
            letter-spacing: .2rem;
            font-size: .65rem;
            margin-left: 10px;

            @media screen and (max-width: ${theme.breakpoint_resume}) {
                font-size: .4rem;
                padding: .25rem .5rem;
            }

            &:first-of-type {
                margin-left: 0px;
            }

            &:hover {
                background: ${theme.color_exp_button_bg_hover};
            }
        }
    }
`;