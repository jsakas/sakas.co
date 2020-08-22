import { css } from '@emotion/core';
import { rgba } from 'polished';

export default theme => css`
    .Resume {
        position: relative;
        margin: 4rem auto;
        max-width: 50rem;
        padding: 1rem;
        font-family: ${theme.font_primary};
        font-weight: 300;
        font-size: 1em;
        border: 1px solid ${rgba(theme.color_secondary, .3)};
        
        @media screen and (max-width: ${theme.breakpoint_resume}) {
            border: 0;
            padding: 0;
            font-size: .8rem;
        }

        @media print {    
            background: unset;
            color: #111;  
            padding: 0;
            border: 0;
            margin: 0;
            max-width: 100%;
            background: none;
            overflow: auto;
        }

        &__print {
            position: absolute;
            right: 2rem;
            top: 2rem;
            background: ${rgba(theme.color_primary, .75)};
            padding: .3rem;
            border-radius: 50%;

            @media screen and (max-width: ${theme.breakpoint_resume}) {
                right: 0rem;
                top: 0rem;
            }

            @media print {
                display: none;
            }
        }
        
        &__print-icon {
            display:block;
            fill: ${theme.color_background};
            width: 1.2rem;
            height: 1.2rem;
            cursor: pointer;
        }

        h1#jon-sakas {
            margin-top: 1rem;
            font-size: 2rem;
        }

        h1#professional-experience {
            page-break-before: always;
            page-break-inside: avoid;
        }
        
        h1 {
            color: ${rgba(theme.color_primary, .9)};
            font-family: ${theme.font_secondary};
            font-weight: 600;
            letter-spacing: 1px;
            margin-top: 3rem;
            margin-bottom: .5rem;
            font-size: 1.5rem;
            text-transform: uppercase;
            letter-spacing: .2rem;

            @media print {
                font-size: 1.5rem;
                font-weight: bold;
                color: #111;
            }
        }

        h2 {
            color: ${rgba(theme.color_primary, .9)};
            font-family: ${theme.font_primary};
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 1.2rem;
            text-transform: uppercase;
            letter-spacing: .2rem;

            @media print {
                font-size: 1.2rem;
                font-weight: bold;
                color: #111;
            }
        }

        h3 {
            color: ${rgba(theme.color_primary, .9)};
            font-family: ${theme.font_primary};
            font-size: .9rem;
            line-height: 1.5em;
            font-weight: 400;
            margin: 0;

            @media print {
                font-size: .9rem;
                font-weight: 400;
            }
        }
        

        h4, h5, h6 {
            font-weight: lighter;
            color: ${rgba(theme.color_primary, .8)};
            font-family: ${theme.font_primary};
            margin: .4em 0;
        }

        p, ul, li {
            letter-spacing: .05rem;
            font-weight: lighter;
            font-size: .8rem;
            

            @media print {
                font-size: .8rem;
                font-weight: 400;
                letter-spacing: initial;
            }
        }

        ul {
            padding-left: 1.1rem;
        }

        a {
            font-weight: 400;
            text-decoration: none;
        }
    }
`;