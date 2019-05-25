import React from 'react';

import style from './Tooltip.style';
import withStyles from '@utils/withStyles';

const Tooltip = ({ render, children }) => {
  return (
    <div className="Tooltip">
      <div className="Tooltip__content">{render()}</div>
      { children }
    </div>
  );
};

Tooltip.defaultProps = {
  render: () => null,
  children: null,
};

export default withStyles(style)(Tooltip);
