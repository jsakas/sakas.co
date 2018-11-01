import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { playClick } from '@utils/Audio';
import history from '@history';

import './ExperimentView.scss';

import experiment_data from './experiment_data.json';

class ExperimentView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      iframeloaded: false,
      experiment: experiment_data.find(e => e.id === Number(props.match.params.id))
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
    let { experiment } = this.state;

    return (
      <div className="ExperimentView">
        <div className="ExperimentView__header">
          <h2>{experiment.title}</h2>
  
          {experiment.description && ( <p>{experiment.description}</p>)}
        
          <div className="ExperimentView__buttons">
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
