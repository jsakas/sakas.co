import React from 'react';

import './Tooltip.scss';

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

export default Tooltip;
