import React from 'react';
import Logo from '../ui/Logo';
import Hamburger from '../ui/Hamburger';
import Menu from './Menu';
import { Link } from "react-router-dom";

const Header = props => {
  let {colorScheme, menuData, isMenuOpen, setIsMenuOpen} = props;
  colorScheme = colorScheme || 'light';
  menuData = menuData || {}

  const handleHamburgerClick = e => {
    console.log(e);
  }

  return (
    <header id="header" className={colorScheme}>
      <Link to="/"><Logo /></Link>
      <Menu items={menuData} />
      <Hamburger isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}

export default Header;;