import { css } from '@emotion/core';

export default theme =>  css`
    .Experiments {
        position: relative;
        margin: 0 auto;
        max-width: 60rem;
        overflow: auto;

        &__grid {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
            grid-auto-rows: minmax(5rem, 10rem);
            grid-gap: 1rem;
        }
    }

    .Experiment {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all .4s;
        cursor: pointer;
        border: 1px solid ${theme.color_exp_border};
        overflow: hidden;

        &__description {
            position: absolute;
            top: 100%;
            left: 0;
            background: ${theme.color_exp_bg};
            color: ${theme.color_exp_text};
            font-family: ${theme.font_primary};
            transition: top .2s;
            padding: 1rem;
            height: 4rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: .8rem;
            font-weight: lighter;
            pointer-events: none;


            @media screen and (max-width: 500px) {
                top: calc(100% - 4rem);
            }
        }

        &:hover &__description {
            top: calc(100% - 4rem);
        }

        &__title {
            position: relative;
            transition: bottom .3s;
            bottom: 0;
            pointer-events: none;

            @media screen and (max-width: 500px) {
            bottom: 1rem;
            }
        }

        &:hover &__title {
            bottom: 1rem;
        }

        &:hover,
        &:active {
            background: rgba($color-primary, .1);
            border: 1px solid ${theme.color_exp_border_hover};
        }
    }
`;