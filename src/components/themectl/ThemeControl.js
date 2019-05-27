import React, { Component } from 'react';
import { withTheme } from 'emotion-theming';

import style from './ThemeControl.style';
import withStyles from '@utils/withStyles';
import compose from '@utils/compose';

import IconSun from '@fortawesome/fontawesome-free/svgs/solid/sun.svg';
import IconMoon from '@fortawesome/fontawesome-free/svgs/regular/moon.svg';

import Tooltip from '@components/tooltip/Tooltip';

class ThemeControl extends Component {
    changeTheme = () => {
      let { theme } = this.props;
      let next = theme.id === 'light'
        ? 'dark'
        : 'light';
      this.props.setTheme(next);
    }

    render() {
      let { theme } = this.props;
      return (
        <div className="ThemeControl">
          <Tooltip
            placement="left" 
            render={() => {
              return (
                <span>
                  {
                    theme.id === 'light'
                      ? 'Switch to dark theme'
                      : 'Switch to light theme'
                  }
                </span>
              );
            }}>

            {
              theme.id === 'light'
                ? (
                  <IconSun className="ThemeControl__icon" onClick={this.changeTheme} />
                )
                : (
                  <IconMoon className="ThemeControl__icon" onClick={this.changeTheme} />
                )
            }
          </Tooltip>
        </div>
      );
    }
}

export default compose(
  withStyles(style),
  withTheme,
)(ThemeControl);