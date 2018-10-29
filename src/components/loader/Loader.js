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
    let className = 'Loader__children';
    className += this.props.loading ? ' Loader__children--loading' : ' Loader__children--loaded';
    return (
      <div className="Loader">

        <TransitionGroup key="loader" component={null}>
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
        </TransitionGroup>

        <div key="loader-children" className={className}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

Loader.defaultProps = {
  loading: false,
  children: null,
};
