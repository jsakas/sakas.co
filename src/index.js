import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Loader from 'components/loader/Loader';
import AsyncComponent from 'components/async/AsyncComponent';
import { playEntry } from '@utils/Audio';

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
          resolve={() => new Promise(resolve => {
            setTimeout(() => {
              resolve({ default: App });
              this.setState({
                appLoading: false,
              });
              playEntry();
            }, 4000);
          })}
        />
      </Loader>
    );
  }
}

ReactDOM.render(<LoadingScreen />, container);
