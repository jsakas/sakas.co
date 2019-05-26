import React, { Fragment } from 'react';
import { Global } from '@emotion/core';

const withStyles = (styles) => WrappedComponent => {
  return (props) => {
    return (
      <Fragment>
        <Global
          styles={styles}
        />
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};
  
export default withStyles;
