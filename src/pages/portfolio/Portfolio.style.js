import { css } from '@emotion/core';

export default theme =>  css`
    .Portfolio {
        position: relative;
        margin: 0 auto;
        max-width: 60rem;
        overflow: auto;

        h2 {
            font-weight: 300;
            color: ${theme.color_exp_title};
        }

        &__project {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin: 5rem 0;
        }

        &__project-info {
            flex: 1;
            width: 100%;
        }

        &__project-thumbnail {
            flex: 1 0 200px;
            width: 100%;
            position: relative;
            overflow: hidden;
            transition: .2s all;

            img {
                position: relative;
                top: 50%;
                left: 50%;
                z-index: 20;
                width: 100%;
                transform: translate(-50%, -50%);
            }
        }

        &__project-thumbnail:hover {
            flex: 1 0 250px;
        }
    }
`;
