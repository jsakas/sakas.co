import React, { Component } from 'react';
import Galaxy from './Galaxy';
import Typer from './Typer';

import './Home.scss';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phase1: false,
      phase2: false,
      phase3: false,
    };
  }
  onTyperComplete = (phase) => () => {
    this.setState({
      [phase]: true,
    })
  }

  render() {
    return (
      <div className="Home">
        <div className="Home__galaxy">
          <Galaxy />
        </div>
        <div className="Home__intro">
          <h1>
            <Typer text="Greetings" onComplete={this.onTyperComplete('phase1')} />
          </h1>
          
          {this.state.phase1 && (
            <p>
              <Typer text="You have reached the home page of Jon Sakas" onComplete={this.onTyperComplete('phase2')} />
            </p>
          )}

          {this.state.phase2 && (
            <p>
              <Typer text="A human from Denver, Colorado, USA, Earth, Milky Way." onComplete={this.onTyperComplete('phase3')} />
            </p>
          )}
        </div>
      </div>
    );
  }
}
