import React, { Component, Fragment } from 'react';
import { Global } from '@emotion/core';
import styles from './Headshot.style.js';

import { TimelineMax } from 'gsap/TweenMax';

export default class Headshot extends Component {
  componentDidMount() {
    this.animate();
  }

    animate = () => {
      const { D1, I1, T1, T2, yoyo, repeat, paused } = this.props;

      let angles = document.getElementById('headshot-svg');
      let image = document.getElementById('headshot-img');
      let paths = Array.from(angles.getElementsByTagName('path'));

      if (image) {
        let imageTl = new TimelineMax({ paused, yoyo, repeat });
        imageTl.delay(T1 + D1 + (paths.length * .01)).to(image, 1, {
          opacity: 1,
        });
      }

      if (angles) {
        let anglesTL = new TimelineMax({ paused, yoyo, repeat });
        anglesTL.delay(T1 + D1 + (paths.length * .01) + 1).to(angles, 1, {
          opacity: 0,
        });
        
        paths.forEach((path, i) => {
          let tl = new TimelineMax({ paused, yoyo, repeat });
          
          tl.delay(D1).from(path, T1, {
            transformOrigin: 'center',
            opacity: 0,
            scale: 0,
            y: 25 - (Math.random() * 50), 
            x: 25 - (Math.random() * 50),
            rotation: 90 - (Math.random() * 180),
            delay: i * I1,
          });
          
          tl.to(path, T2, {
            delay: T1 + (paths.length * I1),
            opacity: 0,
            scale: 0,
          });
          
        });
      }
    }

    render() {
      const {
        imageUrl,
        HeadshotMesh,
        ...extra
      } = this.props;

      return (
        <Fragment>
          <Global styles={styles} />
          <div className="Headshot" {...extra}>
            {imageUrl && <img src={imageUrl} className="Headshot__img" id="headshot-img" />}
            {HeadshotMesh && <HeadshotMesh className="Headshot__svg" id="headshot-svg" />}
          </div>
        </Fragment>
      );
    }
}

Headshot.defaultProps = {
  imageUrl: null,
  HeadshotMesh: null,
  paused: false,
  yoyo: false,
  repeat: 0,
  D1: 0,
  I1: .01,
  T1: 2,
  T2: 1,
};

