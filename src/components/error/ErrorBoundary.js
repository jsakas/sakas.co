import React, { Component } from 'react';

import style from './ErrorBoundary.style';
import withStyles from '@utils/withStyles';

@withStyles(style)
class ErrorBoundary extends Component {
  static defaultProps = {
    onError: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
      info: null,
    };

    this.throwError = this.throwError.bind(this);
  }

  componentDidCatch(error, info) {
    this.throwError(error, info);
  }

  componentWillUnmount () {
    this.unmounted = true;
  }

  throwError (error, info = null) {
    window.Sentry && window.Sentry.captureException(error);
    !this.unmounted && this.setState({
      hasError: true,
      error: error,
      info: info,
    });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return(
        <div className="ErrorBoundary">
          <span className="ErrorBoundary__emoji">😳</span>
          <h2>Erm... well, this is embarrassing</h2>
          <p>Something has gone terribly wrong, and the page cannot be displayed.</p>
        </div>
      );
    }

    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        throwError: this.throwError,
      });
    });
  }
}

export const withErrorBoundary = (WrappedComponent) => {
  return (props) => {
    return (
      <ErrorBoundary>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
};

export default ErrorBoundary;