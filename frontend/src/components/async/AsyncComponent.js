import React from 'react';

/**
 * This component is used to render components loaded asyncronously. Its most useful for resolving
 * components with ESM `import()` statements, which are transpiled to Nodes `require`, or XHR by Babel.
 *
 * Typical usage would look like:
 *
 * <AsyncComponent resolve={() => import('./SomeOtherComponent')} />
 *
 * where the default export of ./SomeOtherComponent.js is a React component.
 */
class AsyncComponent extends React.Component {
  state = {
    /**
     * @typedef {String} status The current state of the loaded component.
     */
    status: 'PENDING',
    /**
     * @typedef {React.Component} Component The resolved component.
     */
    Component: null,
    /**
     * @typedef {Object} data The data fetched from the fetchData prop.
     */
    data: {},
  }

  componentDidMount () {
    this.loadModule();
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  handleError = error => {
    this.props.onError(error);
    return !this.unmounted && this.setState({
      error,
      status: 'ERROR',
    });
  }

  handleLoad = ([ module, data ]) => {
    this.props.onComplete(data);
    return !this.unmounted && this.setState({
      Component: module.default,
      data,
      status: 'COMPLETE',
    });
  }

  loadModule () {
    if (typeof this.props.resolve !== 'function') {
      return this.handleError(
        new Error(`Expected resolve to be typeof function, got ${typeof this.props.resolve}`)
      );
    }

    Promise.all([
      this.props.resolve(),
      this.props.fetchData(this.props),
    ])
      .then(this.handleLoad)
      .catch(this.handleError);
  }

  render () {
    const {
      Errored,
      Loading,
      ...extra
    } = this.props;

    const {
      Component,
      data,
      error,
      status,
    } = this.state;

    if (status === 'PENDING') {
      return <Loading {...extra} />;
    }

    if (status === 'ERROR') {
      return <Errored {...extra} error={error} />;
    }

    return <Component {...extra} data={data} />;
  }
}

AsyncComponent.defaultProps = {
  /**
   * @type {function} Called if fetchData and resolve complete successfully
   */
  onComplete: () => {},
  /**
   * @type {function} Called if an error is thrown from props.resolve or props.fetchData
   */
  onError: () => {},
  /**
   * @typedef {Promise} resolve The resolver function which should return a ES6 module in the format { default }
   */
  resolve: null,
  /**
   * @typedef {Promise} return a promise containing any data the resolved component needs on mount
   */
  fetchData: () => new Promise(resolve => resolve()),
  /**
   * @typedef {React.Component} The component to display if the resolver promise has not completed.
   */
  Loading: () => null,
  /**
   * @typedef {React.Component} The component to display if the resolver promise has errored.
   */
  Errored: () => null,
};

export default AsyncComponent;
