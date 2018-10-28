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
    title: 'About',
    showTitle: false,
  },
  experiments: {
    path: '/experiments/:e?',
    component: Experiments,
    title: 'Experiments',
    showTitle: true,
  },
  resume: {
    path: '/resume',
    component: Resume,
    title: 'Resume',
    showTitle: true,
  },
  archive: {
    path: '/archive',
    component: Archive,
    title: 'Archive',
    showTitle: true,
  },
  audio: {
    path: '/audio',
    component: Audio,
    title: 'Audio',
    showTitle: true,
  }
};

const getBaseRoute = location => location.pathname.split('/').filter(i => i)[0];

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
          <Route key={getBaseRoute(history.location)} render={({ location }) => {
            return (
              <TransitionGroup component={(null)}>

                <Transition key={'logo'} timeout={1000}>
                  {(state) => {
                    return (
                      <div className={`logo logo-transition logo-transition--${state}`}>
                      jon.sakas
                      </div>
                    );
                  }}
                </Transition>


                <Transition key={`${getBaseRoute(history.location)}--title`} timeout={1000}>
                  {(state) => {
                    return (
                      <div className={`title title-transition title-transition--${state}`}>
                        <Switch location={location}>
                          {Object.keys(ROUTES).filter(route => ROUTES[route].showTitle).map((route) => {
                            let title = ROUTES[route].title;
                            return (
                              <Route 
                                exact
                                key={location}
                                path={ROUTES[route].path} 
                                render={() => <h1>{title}</h1>}
                              />
                            );
                          })}
                        </Switch>
                      </div>
                    );
                  }}
                </Transition>

                <Transition key={`${getBaseRoute(history.location)}--page`} timeout={1000}>
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
                                component={Component}
                              />
                            );
                          })}
                        </Switch>
                      </div>
                    );
                  }}
                </Transition>

              </TransitionGroup>
            );
          }} />
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
