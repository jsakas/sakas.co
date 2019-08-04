import React, { Component, Fragment } from 'react';
import { Global } from '@emotion/core';
import styles from './Headshot.style.js';

import { TimelineMax } from 'gsap/TweenMax';

export default class Headshot extends Component {
  componentDidMount() {
    this.animate();
  }

    animate = () => {
      const D1 = 0;
      const T1 = 2;
      const T2 = 1;
      let angles = document.getElementById('headshot-svg');
      let image = document.getElementById('headshot-img');
      let paths = Array.from(angles.getElementsByTagName('path'));

      let imageTl = new TimelineMax({ paused: false, yoyo: false, repeat: 0 });
      imageTl.delay(T1 + D1 + (paths.length * .01)).to(image, 1, {
        opacity: 1,
      });

      paths.forEach((path, i) => {
        let tl = new TimelineMax({ paused: false, yoyo: false, repeat: 0 });

        tl.delay(D1).from(path, T1, {
          transformOrigin: 'center',
          opacity: 0,
          delay: i * .01,
        });
            
        tl.to(path, T2, {
          delay: T1 + (paths.length * .01),
          opacity: 0,
        });

      });
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
            <img src={imageUrl} className="Headshot__img" id="headshot-img" />
            <HeadshotMesh className="Headshot__svg" id="headshot-svg" />
          </div>
        </Fragment>
      );
    }
}


