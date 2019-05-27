import { css } from '@emotion/core';

export default theme => css`
    html, body {
        font-family: ${theme.font_secondary};
        color: $color-text;
        padding: 0;
        margin: 0;
        background: ${theme.color_background};
        color: ${theme.color_text};
        transition: background 1s;

        @media print {
            background: none;
        }
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }

    a {
        color: ${theme.color_primary};
    }

    #app {
        overflow: hidden;
        position: absolute; 
        top: 0;
        right: 0;
        bottom: 0; 
        left: 0;

        @media print {
            overflow: visible;
        }
    }
`;
