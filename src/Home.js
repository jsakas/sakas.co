import React, { Component, Fragment } from 'react';
import Galaxy from './Galaxy';

import './Home.scss';


export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home__galaxy">
          <Galaxy />
        </div>
        <div className="Home__intro">
          <h1>Hello, World</h1>
        </div>
      </div>
    );
  }
}
