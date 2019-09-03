import React, { Component } from 'react';

import './About.scss';

import Copy from './About.md';

export default class About extends Component {
  render() {
    return (
      <div className="About">
        <div className="About__content">
          <div className="About__intro">
            <span className="About__avatar"></span>
            <span className="About__headline">
              <h1>I&apos;m Jon</h1>
              <ul>
                <li>Developer</li>
                <li>Designer</li>
                <li>Musician</li>
              </ul>
            </span>
          </div>
          <div className="About__body">
            <Copy />
          </div>
        </div>
      </div>
    );
  }
}


