import { css } from '@emotion/core';
import { animateOnce } from '@styles/mixins';

export default theme => css`
  html, body {
    background: ${theme.color_background};
  }

  .App {
    ${animateOnce('page-enter', '1s')}

    &__menu-toggle {
      position: absolute;
      bottom: 4rem;
      left: 1.5rem;

      @media print {
        display: none;
      }
    }

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

      @media print {
        display: none;
      }
    }

    &__fade-in {
      transition: opacity 5s, height 1s;
      opacity: 0;
      height: 0;

      &--entered {
        opacity: 1;
        height: 50px;
      }
    }

    &__logo {
      ${animateOnce('logo-enter', '1s')}
      font-family: ${theme.font_secondary};
      position: absolute;
      z-index: 30;
      left: 2rem;
      top: 3rem;
      color: ${theme.color_primary};
      display: inline-block;
      z-index: 40;

      @keyframes logo-enter {
        0% {
          opacity: 0;
        }
        
        100% {
          opacity: 1;
        }
      }

      @media print {
        display: none;
      }

      @media screen and (max-width: ${theme.breakpoint_header}) {
        top: .5rem;
      }
    }

    &__title {
      position: absolute;
      top: 5.5rem;
      padding-left: 2rem;
      z-index: 40;


      @media print {
        display: none;
      }
      
      h1 {
        font-family: ${theme.font_primary};
        font-weight: 100;
        text-transform: uppercase;
        letter-spacing: .5rem;
        font-size: 1.4rem;
        margin: 0;
        position: relative;
      }

      @media screen and (max-width: ${theme.breakpoint_header}) {
        top: .75rem;
        right: 1.5rem;
        
        h1 {
          font-size: 1rem;
          letter-spacing: .2rem;
        }
      }
    }

    &__title-transition {
      transform-origin: left center;

      &--entering {
        ${animateOnce('title-enter', '1s')}
        transform-origin: right center;
      }
      
      &--exiting {
        ${animateOnce('title-exit', '1s')}
      }

      @keyframes title-enter {
        0% {
          opacity: 0;
          left: -150px;
          transform: perspective(400px) rotateY(-90deg);
        }
        
        100% {
          opacity: 1;
          left: 0;
          transform: perspective(400px) rotateY(0deg);
        }
      }

      @keyframes title-exit {
        0% {
          opacity: 1;
          left: 0;
          transform: perspective(400px) rotateY(0deg);
        }
        
        100% {
          opacity: 0;
          left: 150px;
          transform: perspective(400px) rotateY(90deg);
        }
      }
    }

    &__page-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      min-height: 100%;
      padding: 2rem 2rem 4rem 2rem;
      position: relative;
    }

    &__page-content {
      width: 100%;
    }

    &__page {

      -webkit-overflow-scrolling: touch;
      overflow: auto;
      position: absolute; 
      top: 0;
      right: 0;
      bottom: 0; 
      left: 0;

      &--gradient-mask {
        -webkit-mask-image: linear-gradient(
          transparent 0%,
          rgba(0, 0, 0, 1.0) 5%, 
          rgba(0, 0, 0, 1.0) 85%, 
          transparent 92%);
        -webkit-mask-size: 100% 100%;

        @media screen and (max-width: ${theme.breakpoint_header}) {
          -webkit-mask-image: linear-gradient(
            transparent 5%,
            rgba(0, 0, 0, 1.0) 10%, 
            rgba(0, 0, 0, 1.0) 85%, 
            transparent 95%);
        }
      }

      @media print {
        -webkit-mask-image: none;
        overflow: visible;
        height: auto;
      }
    }

    &__page-transition {
      transition: opacity 1s;

      @media print {
        overflow: visible;
      }
      
      &--entering {
        ${animateOnce('page-enter', '1s')}
        overflow: hidden;
      }
      
      &--exiting {
        ${animateOnce('page-exit', '1s')}
        overflow: hidden;
      }

      @keyframes page-enter {
        0% {
          top: -2rem;
          opacity: 0;
        }
        
        100% {
          top: 0rem;
          opacity: 1;
        }
      }
      
      @keyframes page-exit {
        0% {
          top: 0rem;
          opacity: 1;
        }
        
        50% {
          top: 5rem;
          opacity: 0;
        }

        100% {
          top: 5rem;
          opacity: 0;
        }
      }
    }
  }
`;