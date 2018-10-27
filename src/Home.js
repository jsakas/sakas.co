import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Galaxy from './Galaxy';
import Typer from './Typer';

import './Home.scss';

export default class Home extends Component {
  static displayNamme = 'Home';

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
          
          <Transition timeout={0} in={true} appear={true}>
            {(state) => {
              return (
                <h1 className={`fade-in fade-in--${state}`}>
                  <Typer text="Greetings" onComplete={this.onTyperComplete('phase1')} />
                </h1>
                )
              }
            }  
          </Transition>


          {this.state.phase1 && (
          <Transition timeout={0} in={true} appear={true}>
            {(state) => {
              return (
                <p className={`fade-in fade-in--${state}`}>
                  <Typer text="You have reached the home page of Jon Sakas" onComplete={this.onTyperComplete('phase2')} />
                </p>
                )
              }
            }  
          </Transition>
          )}

          {this.state.phase2 && (
          <Transition timeout={0} in={true} appear={true}>
            {(state) => {
              return (
                <p className={`fade-in fade-in--${state}`}>
                  <Typer text="A human from Denver, Colorado, USA, Earth" onComplete={this.onTyperComplete('phase3')} />
                </p>
                )
              }
            }  
          </Transition>
          )}

        </div>
        <div className="Home__navigate" onClick={() => this.props.history.push('/about')}>
          <div className="Home__navigate-circle"></div>
          <div className="Home__navigate-pulse"></div>
        </div>
      </div>
    );
  }
}

