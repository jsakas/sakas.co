import { css } from '@emotion/core';
import avatar from '@images/avatar.jpg';

export default theme => css`
    .About {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${theme.font_secondary};
    flex-direction: column;

    &__canvas {
        z-index: 0;
        position: absolute;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    &__content {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: ${theme.font_secondary};
        flex-direction: column;
        position: absolute;
    }

    &__navigate {
        position: absolute;
        bottom: 4rem;
        left: 50%;
        transform: translate(-50%, 0);
    }

    &__avatar {
        width: 8rem;
        height: 8rem;
        background-image: url(${avatar});
        background-size: contain;
        border-radius: 50%;
        overflow: hidden;
    }

    &__intro {
        display: flex;
        align-items: center;
        justify-content: center;
        animation: intro;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        position: relative;

        span {
        margin: .5rem;
        }
    }

    @keyframes intro {
        0% {
        opacity: 0;
        top: -20px;
        }

        100% {
        opacity: 1;
        top: 0px;
        }
    }

    &__body {
        position: relative;
        animation: intro-2;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }

    @keyframes intro-2 {
        0% {
        opacity: 0;
        bottom: -20px;
        }

        100% {
        opacity: 1;
        bottom: 0px;
        }
    }


    &__headline {
        display: inline-block;
        font-family: ${theme.font_secondary};
        
        h1 {
            color: ${theme.color_primary};
            font-size: 2.5rem;
            margin: .2rem 0;
        }

        ul {
            margin: .2rem 0;
            padding: 0;
            font-family: ${theme.font_primary};
        }
        
        li {
            font-size: 1.5rem;
            line-height: 1.5rem;
            margin: .2rem 0;
            padding: 0;
            list-style-type: none;
        }
    }

    p {
        font-family: ${theme.font_primary};
        text-align: center;
        width: 100%;
        max-width: 30rem;
        padding: 1rem;
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 300;
    }

    a {
        font-weight: bold;
    }
    }
`;