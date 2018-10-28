import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './index.scss';

// import Home from 'pages/home/Home';
import About from 'pages/about/About';
import Menu from 'components/menu/Menu';

const container = document.createElement('div');
document.body.appendChild(container);

const ROUTES = {
  // home: {
  //   path: '/',
  //   component: Home,
  // },
  about: {
    path: '/',
    component: About,
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
        <div className="page">
          <BrowserRouter>
            <Route render={({ location }) => (
              <TransitionGroup component={null}>
                <CSSTransition key={location.key} classNames="page-transition page-transition-" timeout={1000}>
                  <Switch location={location}>
                    {Object.keys(ROUTES).map((route) => {
                      let Component = ROUTES[route].component;
                      return (
                        <Route 
                          exact
                          key={location}
                          path={ROUTES[route].path} 
                          render={() => <Component toggleMenu={this.toggleMenu} />}
                        />
                      );
                    })}
                  </Switch>
                </CSSTransition>
              </TransitionGroup>)
            } />
          </BrowserRouter>
        </div>
        <Menu open={this.state.menuOpen} />
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, container);
