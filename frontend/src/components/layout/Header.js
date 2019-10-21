import React from 'react';
import Logo from '../ui/Logo';
import Hamburger from '../ui/Hamburger';
import Menu from './Menu';
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  static defaultProps = {
    colorScheme: 'light',
    menuData: {}
  };
  render() {

    return (
      <header id="header" className={this.props.colorScheme}>
        <Link to="/"><Logo /></Link>
        <Menu items={this.props.menuData} />
        <Hamburger />
      </header>
    );
  }
}