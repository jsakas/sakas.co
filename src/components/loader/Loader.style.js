import { css } from '@emotion/core';
import { animateOnce } from '@styles/mixins';

const animate = (time = '2s', delay = 0) =>`
    animation-name: planet;
    animation-duration: ${time};
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    animation-delay: ${delay};

    &:before {
        animation-name: size;
        animation-duration: ${time};
        animation-iteration-count: infinite; 
        animation-timing-function: ease;
        background: white;
        border-radius: 50%;
        content: '';
        display: block;
        height: 100%;
        width: 100%;
        animation-delay: ${delay};
    }
`;

export default theme => css`
    .Loader {
        position: relative;
        width: 100%;
        height: 100%;

        &__children {
            height: 100%;
            width: 100%;
            flex: 1;
            transition: opacity .2s;
            opacity: 0;

            &--loading {
            opacity: 0;
            }
            
            &--loaded {
            opacity: 1;
            }
        }

        &__icon {
            &--entering {
                ${animateOnce('loader-enter', '1s')}
            }
            
            &--exiting {
                ${animateOnce('loader-exit', '1s')}
            }
        }

        &__icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .LoaderIcon {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;

        &__planet {
            display: inline-block;
            width: 10px;
            height: 10px;
            transform-origin: center -100px center -100px;
            position: absolute;

            &:nth-of-type(1) {
                ${animate('2s', '0')}
            }

            &:nth-of-type(2){
                ${animate('2s', '-0.5s')}
            }

            &:nth-of-type(3) {
                ${animate('2s', '-1s')}
            }

            &:nth-of-type(4) {
                ${animate('2s', '-1.5s')}
            }
        }
    }

    @keyframes planet {
    0% {
        transform: translate3d(0, 30px, 0);
    }
    25% {
        transform: translate3d(25px, 0, 0);
    }

    50% {
        transform: translate3d(0, 6px, 0);
    }

    75% {
        transform: translate3d(-25px, 0, 0);
        
    }

    100% {
        transform: translate3d(0, 30px, 0);
    }
    }

    @keyframes size {
        0% {
            transform: scale(1.5);
            opacity: 1;
            background: ${theme.color_secondary};
        }

        25% {
            transform: scale(.75);
            opacity: .7;
            background: ${theme.color_secondary};
        }

        50% {
            transform: scale(.3);
            opacity: .5;
            background: ${theme.color_primary};
        }

        75% {
            transform: scale(.75);
            opacity: .7;
            background: ${theme.color_secondary};
        }

        100% {
            transform: scale(1.5);
            opacity: 1;
            background: ${theme.color_secondary};
        }
        }

        @keyframes loader-enter {
        0% {
            opacity: 0;
        }
        
        100% {
            opacity: 1;
        }
        }

        @keyframes loader-exit {
        0% {
            opacity: 1;
        }
        
        100% {
            opacity: 0;
        }
    }


`;