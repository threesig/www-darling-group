import React from 'react';
import Logo from '../ui/Logo';
import Hamburger from '../ui/Hamburger';
import Menu from './Menu';
import WipeLink from '../ui/WipeLink';

const Header = props => {
  let { colorScheme, menuData, handleMainNavToggle } = props;
  colorScheme = colorScheme || 'light';
  menuData = menuData || {}

  return (
    <header id="header" className={colorScheme}>
      <WipeLink className="home" linktype="nav" to="/"><Logo /></WipeLink>
      <Hamburger handleMainNavToggle={handleMainNavToggle} />
    </header>
  );
}

export default Header;