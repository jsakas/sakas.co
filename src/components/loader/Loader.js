import React, { Component, Fragment } from 'react';
import { Global } from '@emotion/core';
import styles from './Loader.style.js';

export const LoaderIcon = () => {
  return (
    <div className="LoaderIcon"></div>
  );
};

class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'started',
    };
  }

  complete = (x) => new Promise(resolve => {
    const timedResolver = () => setTimeout(() => resolve(x), 250);
    this.setState({
      status: 'complete',
    }, timedResolver);
  })

  render() {
    return (
      <Fragment>
        <Global styles={styles} />
        <svg className={`Loader Loader--${this.state.status}`} width="50px" height="50px" viewBox="0 0 50 50">
          <polygon points="25 0 50 50 1 50"></polygon>
        </svg>
      </Fragment>
    );       
  }
}

export default Loader;
