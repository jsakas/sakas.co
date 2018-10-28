import React, { Component } from 'react';

import './Experiments.scss';

const EXPERIMENTS = [
  {
    title: 'Subtractor',
  },
  {
    title: 'Prototype',
  },
  {
    title: 'AudioJS',
  }
];

class Experiment extends Component {
  render() {
    return (
      <div className="Experiment">
        {this.props.title}
      </div>
    );
  }
}

class Experiments extends Component {
  render() {
    return (
      <div className="Experiments page page--padded">
        <div className="Experiments__grid">
          {
            EXPERIMENTS.map((props, i) => {
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
