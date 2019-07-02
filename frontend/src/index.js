import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'emotion-theming';
import Loader from '@components/loader/Loader';
import AsyncComponent from '@components/async/AsyncComponent';
import { playEntry } from '@utils/UISoundFx';

import { Global } from '@emotion/core';
import globalStyle from '@styles/global';

import { GlobalState, defaultState } from '@store';

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
      loading: true,
      theme: THEMES.light,
      globalState: defaultState,
    };
  }

  setTheme = (theme) => {
    this.setState({ theme: THEMES[theme] });
  }

  getData = () => {
    return Promise.all([
      import('./App'),
      fetch('http://localhost:8001/wp-json/wp/v2/posts').then(r => r.json())
    ]).then(([
      module,
      posts,
    ]) => {
      this.setState({
        loading: false,
        globalState: {
          ...this.state.globalState,
          posts,
        }
      }, playEntry)

      return module;
    })
  }

  render() {
    let { globalState } = this.state;

    return (
      <GlobalState.Provider value={{
        ...globalState,
        update: (globalState) => {
          this.setState({ globalState })
        }
      }}>
        <ThemeProvider theme={this.state.theme}>
          <Global styles={globalStyle} />
          <Loader loading={this.state.loading}>
            <AsyncComponent
              setTheme={this.setTheme}
              resolve={this.getData}
            />
          </Loader>
        </ThemeProvider>
      </GlobalState.Provider>
    );
  }
}

ReactDOM.render(<Main />, container);
