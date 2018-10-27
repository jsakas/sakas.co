import React, { Component } from 'react';
import './About.scss';

export default class About extends Component {
  render() {
    return (
      <div className="About">
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
        <p>
          Jon Sakas is a Creative Technologist from Denver, CO. Currently working 
          as the Engineering Manager at <a href="https://www.beatport.com" without rel="noopener noreferrer" target="_blank">Beatport</a>, 
          he is passionate about building a more musicial web.
        </p>
      </div>
    );
  }
}
