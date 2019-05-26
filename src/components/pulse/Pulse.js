import React from 'react';

import style from './Pulse.style';
import withStyles from '@utils/withStyles';

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

export default withStyles(style)(Pulse);
