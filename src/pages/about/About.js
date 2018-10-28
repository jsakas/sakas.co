import React, { Component } from 'react';
import Triangles from 'components/Triangles';
import Pulse from 'components/pulse/Pulse';
import './About.scss';

export default class About extends Component {
  render() {
    return (
      <div className="About">
        <div className="About__canvas">
          <Triangles />
        </div>
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
          <p>
            Jon Sakas is a Creative Technologist from Denver, CO. Currently working 
            as the Engineering Manager at <a href="https://www.beatport.com" without rel="noopener noreferrer" target="_blank">Beatport</a>, 
            he is passionate about building a more musicial web.
          </p>
        </div>
        <div className="About__navigate">
          <Pulse onClick={() => this.props.history.push('/')} />
        </div>
      </div>
    );
  }
}
