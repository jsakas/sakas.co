import React, { Component } from 'react';
import { withRouter } from 'react-router';
import pathToRegexp from 'path-to-regexp';
import routes from '@routes';
import { playClick } from '@utils/UISoundFX';
import history from '@history';

import './ExperimentView.scss';

import experiment_data from './experiment_data';

class ExperimentView extends Component {
  constructor(props) {
    super(props);
    
    let id = props.match.params.id;

    this.state = {
      iframeloaded: false,
      experiment: experiment_data.find(e => e.id === Number(id)),
      prev: id > 0 && experiment_data.find(e => e.id === Number(id) - 1) || null,
      next: id < experiment_data.length && experiment_data.find(e => e.id === Number(id) + 1) || null,
    };
  }

  getExperimentUrl = (experiment) => {
    const toPath = pathToRegexp.compile(routes['experiment'].path);
    return toPath({
      id: experiment.id,
      slug: experiment.slug,
    });
    
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
    let { experiment, next, prev } = this.state;

    return (
      <div className="ExperimentView">
        <div className="ExperimentView__header">
          <h2>{experiment.title}</h2>
  
          {experiment.description && ( <p>{experiment.description}</p>)}
        
          <div className="ExperimentView__buttons">
            {prev && (
              <div className="ExperimentView__button" 
                onClick={() => history.push(this.getExperimentUrl(prev))}
              >Previous</div>
            )}

            {next && (
              <div className="ExperimentView__button" 
                onClick={() => history.push(this.getExperimentUrl(next))}
              >Next</div>
            )}

            {experiment.source_code && (
              <div className="ExperimentView__button" 
                onClick={() => window.open(experiment.source_code)}
              >Source Code</div>
            )}
            <div className="ExperimentView__button" onClick={() => {
              playClick();
              history.push('/code');
            }}>Back</div>
          </div>
        </div>

        {experiment.component && (() => {
          const Component = experiment.component;
          return (

            <div className="ExperimentView__fullscreen">
              <Component />
            </div>
          );
        })()}
  
        {experiment.iframe && (
          <div className={`ExperimentView__iframe ${this.state.iframeloaded ? 'ExperimentView__iframe--loaded': ''}`}>
            <iframe border="0" onLoad={this.oniFrameLoad} src={experiment.iframe}></iframe>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ExperimentView);
