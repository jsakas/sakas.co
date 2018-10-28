import React, { Component } from 'react';
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

const ExperimentView = (props) => {
  const focusOnLoad = (e) => {
    if (e.target) {
      e.target.focus();
    }
  };

  return (
    <div className="ExperimentView">
      <div className="ExperimentView__header">
        <h2>{props.title}</h2>

        {props.description && ( <p>{props.description}</p>)}
      
        <div className="ExperimentView__buttons">
          {props.source_code && (
            <div className="ExperimentView__button" 
              onClick={() => window.open(props.source_code)}
            >Source Code</div>
          )}
          <div className="ExperimentView__button" onClick={() => {
            playClick();
            history.push('/experiments');
          }}>Back</div>
        </div>
      </div>

      {props.iframe && (
        <div className="ExperimentView__iframe">
          <iframe border="0" onLoad={focusOnLoad} src={props.iframe}></iframe>
        </div>
      )}
    </div>
  );
};

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
      </div>
    );
  }
}

class Experiments extends Component {
  render() {
    return (
      <div className="Experiments page page--padded">
        <Router history={history} basename="/experiments">
          <Switch>
            {
              EXPERIMENTS.map((props, i) => {
                return (
                  <Route key={i} path={`/experiments${props.path}`} render={() => {
                    return (
                      <ExperimentView {...props} />
                    );
                  }} />
                );
              })
            }

            <Route exact key="root" path={'**'} render={() => {
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
        </Router>
      </div>
    );
  }
}

export default Experiments;
