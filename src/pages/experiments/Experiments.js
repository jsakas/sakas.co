import React, { Component } from 'react';
import { playBlip, playClick } from '@utils/Audio';
import history from '@history';

import './Experiments.scss';

import experiment_data from './experiment_data.json';

class Experiment extends Component {
  render() {
    return (
      <div className="Experiment" 
        onMouseOver={playBlip}
        onClick={() => {
          playClick();
          history.push(`/code${this.props.path}`);
        }}
      >
        {this.props.title && (
          <div className="Experiment__title">{this.props.title}</div>
        )}

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
      <div className="Experiments">
        <div className={'Experiments__grid'}>
          {
            experiment_data.map((props, i) => {
              return (
                <Experiment key={i} {...props} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default Experiments;
