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

const theme = {
  color_primary: 'rgb(203, 54, 98)',
  color_secondary: 'rgb(143, 82, 128)',
  color_tertiary: '#947494',
  color_text: '#f5f5f5',
  color_background: '#111',
  breakpoint_header: '1200px',
  breakpoint_resume: '768px',
};

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appLoading: true,
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <Loader loading={this.state.appLoading}>
          <AsyncComponent
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
