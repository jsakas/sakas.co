import React, { Component } from 'react';
import pathToRegexp from 'path-to-regexp';
import routes from '@routes';

import history from '@history';

import style from './Portfolio.style';
import withStyles from '@utils/withStyles';

import portfolio_data from './portfolio_data';

class ProjectPreview extends Component {
  constructor(props) {
    super(props);

    const toPath = pathToRegexp.compile(routes['project'].path);
    this.url = toPath({
      id: String(this.props.id),
      slug: String(this.props.slug),
    });
  }

  render() {
    let { id, title, description, thumbnail } = this.props;

    return (
      <div key={id} className="Portfolio__project" onClick={() => {
        history.push(this.url);
      }}>
        <div className="Portfolio__project-info">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="Portfolio__project-thumbnail">
          <img src={thumbnail} width="200" />
        </div>
      </div>
    );
  }

}


class Portfolio extends Component {
  render() {
    return (
      <div className="Portfolio">
        {portfolio_data.map(project => {
          return (<ProjectPreview key={project.id} {...project} />);
        })}
      </div>
    );
  }
}

export default withStyles(style)(Portfolio);
