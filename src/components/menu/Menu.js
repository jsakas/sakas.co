import React, { Component } from 'react';
import history from '@history';
import { playBlip, playClick } from '@utils/UISoundFx';

import ROUTES from '@routes';

import style from './Menu.style';
import withStyles from '@utils/withStyles';

const MenuItem = (route) => {
  const onClick = () => {
    playClick();
    history.push(route.path);
  };

  let Icon = route.Icon;

  return (
    <div className="MenuItem" onClick={onClick} onMouseOver={() => playBlip()}>
      <span className="MenuItem__text">{route.title}</span> 
      <Icon className="MenuItem__icon" />
    </div>
  );
};

MenuItem.defaultProps = {
  onClick: () => null,
  title: '',
  Icon: () => null,
};

class Menu extends Component {
  render() {
    const { open } = this.props;

    let className = 'Menu';
    className += open ? ' Menu--open' : ' Menu--closed';

    return (
      <div className={className}>
        {Object.keys(ROUTES)
          .filter(r => ROUTES[r].menu)
          .sort((a, b) => ROUTES[a].menuOrder - ROUTES[b].menuOrder)
          .map((r, i) => <MenuItem key={i} {...ROUTES[r]} />)}
      </div>
    );
  }
}

export default withStyles(style)(Menu);
