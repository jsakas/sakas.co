import React, { Fragment } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import history from '@history';

// import Home from 'pages/home/Home';
import About from 'pages/about/About';
import Experiments from 'pages/experiments/Experiments';
import Resume from 'pages/resume/Resume';
import Archive from 'pages/archive/Archive';
import Audio from 'pages/audio/Audio';
import Menu from 'components/menu/Menu';
import Pulse from 'components/pulse/Pulse';
import Triangles from 'components/Triangles';

import './App.scss';

const ROUTES = {
  // home: {
  //   path: '/',
  //   component: Home,
  // },
  about: {
    path: '/',
    component: About,
  },
  experiments: {
    path: '/experiments',
    component: Experiments,
  },
  resume: {
    path: '/resume',
    component: Resume,
  },
  archive: {
    path: '/archive',
    component: Archive,
  },
  audio: {
    path: '/audio',
    component: Audio,
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: true,
    };
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render() {
    return (
      <Fragment>
        <div className="App__canvas">
          <Triangles />
        </div>
        <Router history={history}>
          <Route render={({ location }) => (
            <TransitionGroup component={(null)}>
              <Transition key={location.key} timeout={1000}>
                {(state) => {
                  return (
                    <div className={`page page-transition page-transition--${state}`}>
                      <Switch location={location}>
                        {Object.keys(ROUTES).map((route) => {
                          let Component = ROUTES[route].component;
                          return (
                            <Route 
                              exact
                              key={location}
                              path={ROUTES[route].path} 
                              render={() => <Component />}
                            />
                          );
                        })}
                      </Switch>
                    </div>
                  );
                }}

              </Transition>
            </TransitionGroup>)
          } />
        </Router>
        <div className="App__menu-toggle">
          <Pulse onClick={this.toggleMenu} />
        </div>
        <Menu open={this.state.menuOpen} />
      </Fragment>
    );
  }
}

export default App;
