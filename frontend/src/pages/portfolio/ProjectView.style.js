import { css } from '@emotion/core';
import { animateOnce } from '@styles/mixins';

export default theme => css`
    .ProjectView {
        position: relative;
        margin: 0 auto;
        max-width: 100%;
        overflow: auto;
        transition: opacity 1s;

        h2 {
            font-weight: 300;
            color: ${theme.color_exp_title};
            font-size: 4rem;
            line-height: 4rem;
            margin-bottom: 1rem;
            max-width: 60rem;
        }

        &__header {
            max-width: 60rem;
            margin: 0 auto;
        }

        &__content > * {
            max-width: 60rem;
            margin: 0 auto;
        }

        .wp-block-image {
            max-width: 100%;
            height: 35rem;
            overflow: hidden;
            margin: 2rem 0;

            img {
                width: 100%;
                height: auto;
                top: 50%;
                transform: translate(0, -50%);
                position: relative;
            }

        }

      
        &--entering {
            ${animateOnce('project-enter', '3s')}
            overflow: hidden;
        }
        
        &--exiting {
            ${animateOnce('project-exit', '1s')}
            overflow: hidden;
        }

        @keyframes project-enter {
            0% {

            opacity: 0;
            }
            
            100% {
            opacity: 1;
            }
        }
        
        @keyframes project-exit {
            0% {
            opacity: 1;
            }

            100% {
            opacity: 0;
            }
        }
    }
`;