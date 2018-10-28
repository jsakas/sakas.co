import React, { Component } from 'react';
import history from '@history';
import { playBlip } from '@utils/Audio';

import './Menu.scss';

const MENU_ITEMS = [
  {
  //   onClick: () => history.push('/'),
  //   title: 'Home',
  // }, {
    onClick: () => history.push('/'),
    title: 'About',
  }, {
    onClick: () => history.push('/experiments'),
    title: 'Experiments',
  }, {
    onClick: () => history.push('/resume'),
    title: 'Resume',
  }, {
    onClick: () => history.push('/archive'),
    title: 'Archive',
  }, {
    onClick: () => history.push('/audio'),
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