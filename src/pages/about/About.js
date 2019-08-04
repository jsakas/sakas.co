import React, { Component } from 'react';
import withStyles from '@utils/withStyles';

import style from './About.style';

import Headshot from '@components/headshot';

import HeadshotImage from '@images/hs_mesh.png';
import HeadshotMesh from '@images/hs_mesh.svg';

class About extends Component {
  render() {
    return (
      <div className="About">
        <div className="About__content">
          <div className="About__intro">
            <Headshot
              className="About__avatar"
              imageUrl={HeadshotImage}
              HeadshotMesh={HeadshotMesh}
            />
            <span className="About__headline">
              <h1>I&apos;m Jon</h1>
              <ul>
                <li>Developer</li>
                <li>Designer</li>
              </ul>
            </span>
          </div>
          <div className="About__body">
            <p>
              Jon Sakas is a freelance web developer from Denver, CO. 
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(About);
