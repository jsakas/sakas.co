import React, { Component, Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { playBlip } from '@utils/Audio';
import history from '@history';

import './Experiments.scss';

const EXPERIMENTS = [
  {
    path: '/subtractor',
    title: 'Subtractor',
    description: 'A polyphonic synthesizer built with JavaScript',
    iframe: 'https://jsakas.github.io/Subtractor/',
  },
  // {
  //   path: '/prototype',
  //   title: 'Prototype',
  // },
  // {
  //   path: '/audiojs',
  //   title: 'AudioJS',
  // }
];

const ExperimentView = (props) => {
  return (
    <div className="ExperimentView">
      <h2>{props.title}</h2>
      {props.description && (
        <p>{props.description}</p>
      )}
      {props.iframe && (
        <div className="iframe"><iframe border="0" src={props.iframe}></iframe></div>
      )}
      <div className="ExperimentView__back" onClick={() => history.push('/experiments')}>Back</div>
    </div>
  );
};

class Experiment extends Component {
  render() {
    return (
      <div className="Experiment" 
        onMouseOver={playBlip}
        onClick={() => history.push(`/experiments${this.props.path}`)}
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
                  <Route key={i} path={`/experiments${props.path}`} render={() => <ExperimentView {...props} />} />
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
