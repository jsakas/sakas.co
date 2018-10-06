import React, { Component } from 'react';
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
          <h1>Greetings</h1>
          <p>You have reached the home page of Jon Sakas.</p>
          <p>A human from Denver, CO, USA, Earth.</p>
        </div>
      </div>
    );
  }
}
