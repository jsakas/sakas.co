import { css } from '@emotion/core';

import prismStyles from '@styles/prism';

export default theme => css`
    ${prismStyles(theme)}

    .Archive {  
        position: relative;
        margin: 0 auto;
        max-width: 40rem;
        overflow: auto;
        }

        .Gist {
        font-family: 'IBM Plex Mono', sans-serif;
        padding: 2rem 0;

        &__heading {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: .5rem;
        }


        &__title {
            font-family: 'IBM Plex Mono', sans-serif;
            font-weight: bold;
            font-size: .6rem;
            letter-spacing: .1rem;
            margin: 0;
            color: ${theme.color_tertiary};
        }

        &__id {
            font-family: 'IBM Plex Mono', sans-serif;
            font-weight: lighter;
            font-size: .6rem;
            letter-spacing: .1rem;
            margin: 0;
            
            @media screen and (max-width: ${theme.breakpoint_resume}) {
            display: none;
            }
        }

        &__language {
            font-family: 'IBM Plex Mono', sans-serif;
            font-weight: normal;
            font-size: .6rem;
            letter-spacing: .1rem;
            margin: 0;
            color: ${theme.color_primary};
        }

        &__body {
            font-family: 'IBM Plex Mono', sans-serif;
            background: rgba(#111, .3);
            padding: 1rem;
            border-radius: .5rem;
            overflow: auto;

            @media screen and (max-width: ${theme.breakpoint_resume}) {
            padding: 0;
            background: none;
            font-size: .5rem;
            }
        }
    }
`