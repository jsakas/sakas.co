import { css } from '@emotion/core';

export default theme => css`
    html, body {
        font-family: ${theme.font_primary};
        padding: 0;
        margin: 0;
        background: ${theme.color_background};
        color: ${theme.color_text};
        transition: background 1s;

        @media print {
            background: none;
        }
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.font_secondary};
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
