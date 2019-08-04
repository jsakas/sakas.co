import React from 'react';

import style from './ErrorPage.style';
import withStyles from '@utils/withStyles';

const _404 = () => {
  return (
    <div className="Error">
      <div className="Error__container">
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </div>
  );
};

export default withStyles(style)(_404);
