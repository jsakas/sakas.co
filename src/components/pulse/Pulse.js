import React from 'react';
import PropTypes from 'prop-types';
import './Pulse.scss';

const Pulse = ({ onClick }) => {
  return (
    <div className="Pulse" onClick={onClick}>
      <div className="Pulse__circle"></div>
      <div className="Pulse__pulse"></div>
    </div>
  );
};

Pulse.defaultProps = {
  onClick: () => null,
};

export default Pulse;
