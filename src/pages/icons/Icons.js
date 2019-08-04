import React, { Component } from 'react';
import withStyles from '@utils/withStyles';
import style from './Icons.style';

const allFiles = (ctx => {
  let keys = ctx.keys();
  let values = keys.map(ctx);
  return keys.reduce((o, k, i) => { o[k] = values[i]; return o; }, {});
})(require.context('@icons', true, /\.js$/));

class Icons extends Component {
  render() {
    return (
      <div className="Icons">
        {
          Object.keys(allFiles).map((key, i) => {
            let Icon = allFiles[key].default;
            return (
              <div className="Icons__icon" key={i}>
                <Icon />
                {key.replace('./', '').replace('.js', '')}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default withStyles(style)(Icons);
