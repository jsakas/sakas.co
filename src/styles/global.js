import { css } from '@emotion/core';

export default theme => css`
    @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:300,400,500,700');
    @import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
    @import url('https://fonts.googleapis.com/css?family=Kanit&display=swap');

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
