import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import Loader from '@components/loader/Loader';
import AsyncComponent from '@components/async/AsyncComponent';
import { playEntry } from '@utils/UISoundFx';

import { Global } from '@emotion/core';
import globalStyle from '@styles/global';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

const THEMES = {
  light: require('@themes/light'),
  dark: require('@themes/dark'),
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appLoading: true,
      theme: THEMES.dark,
    };
  }

  setTheme = (theme) => {
    this.setState({ theme: THEMES[theme] });
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        <Global styles={globalStyle} />
        <Loader loading={this.state.appLoading}>
          <AsyncComponent
            setTheme={this.setTheme}
            resolve={() => import('./App').then((module) => {
              this.setState({ appLoading: false, }, playEntry);
              return module;
            })}
          />
        </Loader>
      </ThemeProvider>
    );
  }
}

ReactDOM.render(<Main />, container);
