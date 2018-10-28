import React, { Component } from 'react';
import history from '@history';
import { playBlip, playClick } from '@utils/Audio';

import './Menu.scss';

const menuClick = (onClick) => {
  playClick();
  onClick();
};

const MENU_ITEMS = [
  {
  //   onClick: () => history.push('/'),
  //   title: 'Home',
  // }, {
    onClick: () => menuClick(() => history.push('/')),
    title: 'About',
  }, {
    onClick: () => menuClick(() => history.push('/code')),
    title: 'Code',
  }, {
    onClick: () => menuClick(() => history.push('/resume')),
    title: 'Resume',
  }, {
    onClick: () => menuClick(() => history.push('/archive')),
    title: 'Archive',
  }, {
    onClick: () => menuClick(() => history.push('/audio')),
    title: 'Audio',
  }
];

const MenuItem = ({ onClick, title }) => {
  return (
    <div className="MenuItem" onClick={onClick} onMouseOver={() => playBlip()}>
      {title}
    </div>
  );
};

MenuItem.defaultProps = {
  onClick: () => null,
  title: '',
};

export default class Menu extends Component {
  render() {
    const { open } = this.props;

    let className = 'Menu';
    className += open ? ' Menu--open' : ' Menu--closed';

    return (
      <div className={className}>
        {MENU_ITEMS.map((props, i) => <MenuItem key={i} {...props} />)}
      </div>
    );
  }
}