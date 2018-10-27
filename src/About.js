import React, { Component } from 'react';

import './About.scss';

export default class About extends Component {
  render() {
    return (
      <div className="About">
        <span onClick={() => this.props.history.push('/')}>Go Home</span>
      </div>
    );
  }
}
