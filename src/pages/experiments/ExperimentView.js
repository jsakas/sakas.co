import React, { Component } from 'react';
import { withRouter } from 'react-router';
import pathToRegexp from 'path-to-regexp';
import routes from '@routes';
import { playClick } from '@utils/UISoundFx';
import history from '@history';
import AsyncComponent from '@components/async/AsyncComponent';

import style from './ExperimentView.style';
import withStyles from '@utils/withStyles';
import compose from '@utils/compose';

const requireAll = (r) => r.keys().map(r);
const experiment_data = requireAll(require.context('@docs/experiments', true, /\.md$/));

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
    let { transitionState } = this.props;

    let classList = [
      'App__page',
      'App__page-transition',
      `App__page-transition--${transitionState}`,
      'ExperimentView'
    ];

    let ComponentExperiement = experiment.default;

    return (
      <div className={classList.join(' ')}>
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

        {ComponentExperiement && (
          <div className="ExperimentView__fullscreen">
            <ComponentExperiement />
          </div>
        )}
    
        {experiment.iframe && (
          <div className={`ExperimentView__iframe ${this.state.iframeloaded ? 'ExperimentView__iframe--loaded': ''}`}>
            <iframe border="0" onLoad={this.oniFrameLoad} src={experiment.iframe}></iframe>
          </div>
        )}
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(style),
)(ExperimentView);
