import React, { Component } from 'react';
import { withRouter } from 'react-router';
import style from './ProjectView.style';
import withStyles from '@utils/withStyles';
import compose from '@utils/compose';

import portfolio_data from './portfolio_data';

class ProjectView extends Component {
  constructor(props) {
    super(props);
    
    let id = props.match.params.id;

    this.state = {
      project: portfolio_data.find(e => e.id === Number(id)),
      prev: id > 0 && portfolio_data.find(e => e.id === Number(id) - 1) || null,
      next: id < portfolio_data.length && portfolio_data.find(e => e.id === Number(id) + 1) || null,
    };

  }

  render() {
    let { project, next, prev } = this.state;
    let { transitionState } = this.props;

    let classList = [
      'App__page',
      'App__page-transition',
      `App__page-transition--${transitionState}`,
      'ProjectView'
    ]

    return (
        <div className={classList.join(' ')}>
          <div className="ProjectView__header">
            <h2>{project.title}</h2>
    
            {project.description && ( <p>{project.description}</p>)}
          </div>
        </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(style),
)(ProjectView);
