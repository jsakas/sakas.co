import React, { Component } from 'react';

import './Menu.scss';

const MENU_ITEMS = [
  {
    onClick: () => {},
    title: 'Experiments',
  },{
    onClick: () => {},
    title: 'Resume',
  },{
    onClick: () => {},
    title: 'Archive',
  },{
    onClick: () => {},
    title: 'Audio',
  }
];

const MenuItem = ({ onClick, title }) => {
  return (
    <div className="MenuItem" onClick={onClick}>
      {title}
    </div>
  );
};

MenuItem.defaultProps = {
  onClick: () => null,
  title: '',
}

export default class Menu extends Component {
  render() {
    const { open } = this.props;

    let className = 'Menu';
    className += open ? ' Menu--open' : ' Menu--closed';

    return (
      <div className={className}>
        {MENU_ITEMS.map((props, i) => <MenuItem key={if} {...props} />)}
      </div>
    );
  }
}