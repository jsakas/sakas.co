import { css } from '@emotion/core';
import { rgba } from 'polished';

export default theme => css`
    .Resume {
        position: relative;
        margin: 4rem auto;
        max-width: 50rem;
        padding: 1rem;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 1em;
        border: 1px solid ${rgba(theme.color_secondary, .3)};
        
        @media screen and (max-width: ${theme.breakpoint_resume}) {
            border: 0;
            padding: 0;
            font-size: .8rem;
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
            fill: #111;
            width: 1.2rem;
            height: 1.2rem;
            cursor: pointer;
        }
        
        h1 {
            color: rgba(#fff, .8);
            font-family: 'Raleway', sans-serif;
            font-weight: 300;
            letter-spacing: 1px;

            @media print {
            font-size: 1.3rem;
            font-weight: bold;
            color: #111;
            }
        }

        h2 {
            color: ${rgba(theme.color_primary, .9)};
            font-family: 'Raleway', sans-serif;
            font-weight: 300;
            letter-spacing: 1px;

            @media print {
            font-size: 1.1rem;
            font-weight: bold;
            color: #111;
            }
        }

        h1#professional-experience {
            position: relative;
            page-break-before: always;
            page-break-inside: avoid;
        }
        

        h3, h4, h5, h6 {
            font-weight: 100;
            color: ${rgba(theme.color_primary, .8)};
            font-family: 'Raleway', sans-serif;
        }

        h3 {
            @media print {
            font-size: .9rem;
            font-weight: bold;
            }
        }

        p, ul, li {
            letter-spacing: .05rem;
            font-weight: lighter;
            

            @media print {
            font-size: .8rem;
            font-weight: 400;
            letter-spacing: initial;
            }
        }

        ul {
            padding: 0 0 0 1.4rem;
        }

        li {
            padding: 0;
        }

        a {
            font-weight: 400;
        }

        @media print {    
            background: unset;
            color: #111;  
            padding: 0;
            border: 0;
            max-width: 100%;
            background: none;
            overflow: auto;
        }
    }
`;