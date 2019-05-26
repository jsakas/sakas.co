import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import Typer from './Typer';
import { playClick } from '@utils/UISoundFx';

import style from './CryptoTyper.style';
import withStyles from '@utils/withStyles';

class Home extends Component {
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
    setTimeout(() => {
      this.setState({
        [phase]: true,
      });
    }, 1000);
  }

  render() {
    return (
      <div className="Home">
        <div className="Home__intro">

          <Transition timeout={0} in={true} appear={true}>
            {(state) => {
              return (
                <h1 className={`App__fade-in App__fade-in--${state}`}>
                  <Typer 
                    text="Greetings"
                    onComplete={this.onTyperComplete('phase1')}
                    onType={playClick}
                    speed="50"
                  />
                </h1>
              );
            }
            }  
          </Transition>


          {this.state.phase1 && (
            <Transition timeout={0} in={true} appear={true}>
              {(state) => {
                return (
                  <p className={`App__fade-in App__fade-in--${state}`}>
                    <Typer
                      text="You have reached the home page of Jon Sakas"
                      onComplete={this.onTyperComplete('phase2')}
                      onType={playClick}
                      speed="50"
                    />
                  </p>
                );
              }
              }  
            </Transition>
          )}

          {this.state.phase2 && (
            <Transition timeout={0} in={true} appear={true}>
              {(state) => {
                return (
                  <p className={`App__fade-in App__fade-in--${state}`}>
                    <Typer
                      text="A human from Denver, Colorado, USA, Earth"
                      onComplete={this.onTyperComplete('phase3')}
                      onType={playClick}
                      speed="50"
                    />
                  </p>
                );
              }
              }  
            </Transition>
          )}

        </div>
      </div>
    );
  }
}

export default withStyles(style)(Home);
