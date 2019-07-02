import React, { Component } from 'react';
import { withRouter } from 'react-router';
import style from './ProjectView.style';
import withStyles from '@utils/withStyles';
import compose from '@utils/compose';
import { GlobalState } from '@store';

import Html from '@components/Html';

import portfolio_data from './portfolio_data';

class ProjectView extends Component {
  static contextType = GlobalState;

  render() {
    let { transitionState } = this.props;

    // TODO - this is probably not the most effecient way to do this...
    let id = this.props.match.params.id;
    let post = this.context.posts.find(e => e.id === Number(id));

    let classList = [
      'ProjectView',
      `ProjectView--${transitionState}`,
    ]

    return (
      <div className="App__page">
        
        <div className={classList.join(' ')}>
          <div className="ProjectView__header">

            <Html content={post.title.rendered} type="h2" />
  
          </div>

          {post.content && ( <Html content={post.content.rendered} type="div" className="ProjectView__content" />)}
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(style),
)(ProjectView);
