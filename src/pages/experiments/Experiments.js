import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import routes from '@routes';
import { playBlip, playClick } from '@utils/UISoundFx';
import history from '@history';

import style from './Experiments.style';
import withStyles from '@utils/withStyles';

import experiment_data from './experiment_data';

class Experiment extends Component {
  constructor(props) {
    super(props);
    
    const toPath = pathToRegexp.compile(routes['experiment'].path);
    this.url = toPath({
      id: this.props.id,
      slug: this.props.slug,
    });
  }

  render() {
    return (
      <div className="Experiment" 
        onMouseOver={playBlip}
        onClick={() => {
          playClick();
          history.push(this.url);
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

export default withStyles(style)(Experiments);
