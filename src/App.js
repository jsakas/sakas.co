import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import history from '@history';

import Menu from '@components/menu/Menu';
import Pulse from '@components/pulse/Pulse';
import Triangles from '@components/Triangles';
import ROUTES from '@routes';

import './App.scss';

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
          <Triangles />
        </div>
        <Router history={history}>
          <Route key={getBaseRoute(history.location)} render={({ location }) => {
            return (
              <TransitionGroup component={null}>

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
                    return (
                      <div className={`App__page App__page-transition App__page-transition--${state}`}>
                        <Switch location={location}>
                          {Object.keys(ROUTES).map((route) => {
                            let Page = ROUTES[route].component;
                            return (
                              <Route 
                                exact
                                key={location}
                                path={ROUTES[route].path} 
                                render={() => {
                                  return (
                                    <div className="App__page-wrapper">
                                      <div className="App__page-content">
                                        <Page />
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
        </Router>
        <div className="App__menu-toggle" style={{ display: 'none' }}>
          <Pulse onClick={this.toggleMenu} />
        </div>
        <Menu open={this.state.menuOpen} />
      </div>
    );
  }
}

export default App;
