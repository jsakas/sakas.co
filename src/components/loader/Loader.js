import React, { Component } from 'react';
import { TransitionGroup, Transition } from 'react-transition-group';

import './Loader.scss';

const LoaderIcon = () => {
  return (
    <div className="LoaderIcon">
      <div className="LoaderIcon__planet" />
      <div className="LoaderIcon__planet" />
      <div className="LoaderIcon__planet" />
      <div className="LoaderIcon__planet" />
    </div>
  );
};

export default class Loader extends Component {
  render() {
    return (
      <div className="Loader">

        <TransitionGroup component={null}>
        
          {this.props.loading && (
            <Transition key="icon" timeout={1000}>
              {(state) => {
                return (
                  <div className={`Loader__icon Loader__icon--${state}`}>
                    <LoaderIcon />
                  </div>
                );
              }}
            </Transition>
          )}

          {!this.props.loading && this.props.children && (
            <Transition key="children" timeout={2000}>
              {(state) => {
                return (
                  <div className={`Loader__children Loader__children--${state}`}>
                    {this.props.children}
                  </div>
                );
              }}
            </Transition>
          )}

        </TransitionGroup>

      </div>
    );
  }
}

Loader.defaultProps = {
  loading: false,
  children: null,
};
