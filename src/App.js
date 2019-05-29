import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import history from '@history';

import ErrorBoundary, { withErrorBoundary } from '@components/error/ErrorBoundary';
import ThemeControl from '@components/themectl/ThemeControl';
import Triangles from '@components/triangles/Triangles';
import Menu from '@components/menu/Menu';
import Pulse from '@components/pulse/Pulse';
import ROUTES from '@routes';

import ExperimentView from '@pages/experiments/ExperimentView';

import compose from '@utils/compose';
import withStyles from '@utils/withStyles';

import style from './App.style';

const getBaseRoute = location => location.pathname.split('/').filter(i => i)[0];

class App extends Component {
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

      <div className="App">
        <div className="App__canvas">
          {/* <Triangles /> */}
        </div>

        <ThemeControl setTheme={this.props.setTheme} />

        <Router history={history}>
          <Switch>

            <Route path="*" key={getBaseRoute(history.location)} render={({ location }) => {
              return (
                <TransitionGroup component={null}>
                  <Transition key={`${history.location.pathname}--experiment`} timeout={5000}>
                    {(state) => {
                      return (
                          <Switch location={location}>
                            <Route
                              exact
                              key={location.pathname}
                              path="/code/:id/:slug"
                              render={(props) => (
                                <ExperimentView {...props} transitionState={state} />
                              )}
                              transitionState={state}
                            />
                          </Switch>
                      );
                    }}
                  </Transition>

                  <Transition key={'logo'} timeout={1000}>
                    {(state) => {
                      return (
                        <div className={`App__logo App__logo-transition App__logo-transition--${state}`}>
                          jon.sakas
                          </div>
                      );
                    }}
                  </Transition>


                  <Transition key={`${getBaseRoute(history.location)}--title`} timeout={3000}>
                    {(state) => {
                      return (
                        <div className={'App__title'}>
                          <Switch location={location}>
                            {Object.keys(ROUTES).filter(route => ROUTES[route].showTitle).map((route) => {
                              let title = ROUTES[route].title;
                              return (
                                <Route
                                  exact
                                  key={location}
                                  path={ROUTES[route].path}
                                  render={() => <h1 className={`App__title-transition App__title-transition--${state}`}>{title}</h1>}
                                />
                              );
                            })}
                          </Switch>
                        </div>
                      );
                    }}
                  </Transition>

                  <Transition key={`${history.location.pathname}--page`} timeout={1000}>
                    {(state) => {
                      console.log('PAGE STATE', state);
                      return (
                        <div className={`App__page App__page-transition App__page-transition--${state} App__page--gradient-mask`}>
                          <Switch location={location}>
                            {Object.keys(ROUTES).map((r) => {
                              let route = ROUTES[r];
                              if (route.mainView === false) {
                                return;
                              }
                              let Page = route.component;
                              return (
                                <Route
                                  exact
                                  key={location.pathname}
                                  path={route.path}
                                  render={() => {
                                    return (
                                      <div className="App__page-wrapper">
                                        <div className="App__page-content">
                                          <ErrorBoundary>
                                            <Page />
                                          </ErrorBoundary>
                                        </div>
                                      </div>
                                    );
                                  }}
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

          </Switch>

          <div className="App__menu-toggle" style={{ display: 'none' }}>
            <Pulse onClick={this.toggleMenu} />
          </div>

          <Menu open={this.state.menuOpen} />
        
        </Router>
      </div>
    );
  }
}

export default compose(
  withErrorBoundary,
  withStyles(style),
)(App);
