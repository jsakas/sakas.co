import React from 'react';
import ReactDOM from 'react-dom';
import Loader from '@components/loader/Loader';
import AsyncComponent from '@components/async/AsyncComponent';
import { playEntry } from '@utils/UISoundFx';

import './index.scss';

const container = document.createElement('div');
container.id = 'app';
document.body.appendChild(container);

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appLoading: true,
    };
  }

  render() {
    return (
      <Loader loading={this.state.appLoading}>
        <AsyncComponent
          resolve={() => import('./App').then((module) => {
            this.setState({ appLoading: false, }, playEntry);
            return module;
          })}
        />
      </Loader>
    );
  }
}

ReactDOM.render(<LoadingScreen />, container);
