import React from 'react';
import Menu from './Menu';
export default class MainNavigation extends React.Component {
  render() {
    return (
      <nav id="nav-main" className="nav color-scheme-dark full-height">
        <Menu items={this.props.menuData} />
      </nav>
    );
  }
}