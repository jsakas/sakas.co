import React from 'react';

import style from './Tooltip.style';
import withStyles from '@utils/withStyles';

const Tooltip = ({ render, placement, children }) => {
  let classList = ['Tooltip'];
  switch (placement) {
  case 'left':
    classList.push('Tooltip--left');
    break;
  case 'bottom':
    classList.push('Tooltip--bottom');
    break;
  default:
    break;
  }

  return (
    <div className={classList.join(' ')}>
      <div className="Tooltip__content">{render()}</div>
      { children }
    </div>
  );
};

Tooltip.defaultProps = {
  render: () => null,
  placement: 'bottom',
  children: null,
};

export default withStyles(style)(Tooltip);
