import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import Loader from '@components/loader/Loader';
import AsyncComponent from '@components/async/AsyncComponent';

import { Global } from '@emotion/core';
import globalStyle from '@styles/global';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

const THEMES = {
  light: require('@themes/light'),
  dark: require('@themes/dark'),
};

const pause = (t) => (v) => new Promise(resolve => setTimeout(() => resolve(v), t));

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: THEMES.dark,
    };

    this.loaderRef = React.createRef();
  }

  setTheme = (theme) => {
    this.setState({ theme: THEMES[theme] });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Global styles={globalStyle} />
        <AsyncComponent
          Loading={() => {
            return (
              <div className="full-center">
                <Loader ref={this.loaderRef} />
              </div>
            );
          }}
          resolve={() => new Promise(resolve => {
            import('./App')
              .then(pause(3000))
              .then(this.loaderRef.current.complete)
              .then(resolve);
          })}
          setTheme={this.setTheme}
        />
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, container);
