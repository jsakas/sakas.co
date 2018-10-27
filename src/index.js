import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './index.scss';

import Home from './Home';
import About from './About';

const container = document.createElement('div');
document.body.appendChild(container);

const ROUTES = {
  home: {
    path: '/',
    component: Home,
  },
  about: {
    path: '/about',
    component: About,
  }
};

ReactDOM.render(
  <BrowserRouter>
    <Route render={({ location }) => (
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} classNames="page-transition page-transition-" timeout={1000}>
          <Switch location={location}>
            {Object.keys(ROUTES).map((route) => {
              return (
                <Route 
                  exact
                  key={location}
                  path={ROUTES[route].path} 
                  component={ROUTES[route].component} 
                />
              );
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>)
    } />
  </BrowserRouter>
  , container);
