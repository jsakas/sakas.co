import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { Router, Route, Switch } from 'react-router-dom';
import { playBlip, playClick } from '@utils/Audio';
import history from '@history';

import './Experiments.scss';

const EXPERIMENTS = [
  {
    path: '/subtractor',
    title: 'Subtractor',
    description: 'A polyphonic synthesizer built with JavaScript',
    iframe: 'https://jsakas.github.io/Subtractor/',
    source_code: 'https://github.com/jsakas/Subtractor/'
  }, 
  {
    path: '/eclipse',
    title: 'Eclipse',
    description: 'Audio visualization',
    iframe: 'https://codepen.io/jsakas/live/NpLKdv',
    source_code: 'https://codepen.io/jsakas/pen/NpLKdv',
  },
  {
    path: '/starry-night',
    title: 'Starry Night',
    description: 'JavaScript particles',
    iframe: 'https://codepen.io/jsakas/live/VEjbog',
    source_code: 'https://codepen.io/jsakas/pen/VEjbog'
  }
];

class ExperimentView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iframeloaded: false,
    };
  }

  oniFrameLoad = (e) => {
    this.setState({
      iframeloaded: true,
    });

    if (e.target) {
      e.target.focus();
    }
  }

  render() {
    return (
      <div className="ExperimentView">
        <div className="ExperimentView__header">
          <h2>{this.props.title}</h2>
  
          {this.props.description && ( <p>{this.props.description}</p>)}
        
          <div className="ExperimentView__buttons">
            {this.props.source_code && (
              <div className="ExperimentView__button" 
                onClick={() => window.open(this.props.source_code)}
              >Source Code</div>
            )}
            <div className="ExperimentView__button" onClick={() => {
              playClick();
              history.push('/experiments');
            }}>Back</div>
          </div>
        </div>
  
        {this.props.iframe && (
          <div className={`ExperimentView__iframe ${this.state.iframeloaded ? 'ExperimentView__iframe--loaded': ''}`}>
            <iframe border="0" allowTransparency onLoad={this.oniFrameLoad} src={this.props.iframe}></iframe>
          </div>
        )}
      </div>
    );
  }
}


class Experiment extends Component {
  render() {
    return (
      <div className="Experiment" 
        onMouseOver={playBlip}
        onClick={() => {
          playClick();
          history.push(`/experiments${this.props.path}`);
        }}
      >
        {this.props.title}

        {this.props.description && (
          <div className="Experiment__description">{this.props.description}</div>
        )}
      </div>
    );
  }
}

class Experiments extends Component {
  render() {
    return (
      <div className="Experiments page page--padded">
        <Router history={history} basename="/experiments">
          <Route render={({ location }) => (
            <TransitionGroup component={null}>
              <Transition key={history.location.pathname} timeout={1000}>
                {(state) => {
                  return (
                    <div className={`exp-transition exp-transition--${state}`}>
                      <Switch location={location}>
                        {
                          EXPERIMENTS.map((props) => {
                            return (
                              <Route exact key={props.path} path={`/experiments${props.path}`} render={() => {
                                return (
                                  <ExperimentView key={props.path} {...props} />
                                );
                              }} />
                            );
                          })
                        }
          
                        <Route exact key="**" path={'**'} render={() => {
                          return (
                            <div className="Experiments__grid">
                              {
                                EXPERIMENTS.map((props, i) => {
                                  return (
                                    <Experiment key={i} {...props} />
                                  );
                                })
                              }
                            </div>
                          );
                        }} />
                      </Switch>
                    </div>
                  );
                }}
              </Transition>
            </TransitionGroup>
            
          )} />
        </Router>
      </div>
    );
  }
}

export default Experiments;
