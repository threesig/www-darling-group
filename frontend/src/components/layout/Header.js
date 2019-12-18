import React from 'react';
import Hamburger from '../ui/Hamburger';
import WipeLink from '../ui/WipeLink';
import Wordmark from '../ui/Wordmark';

const Header = props => {
  let { colorScheme, menuData, handleMainNavToggle } = props;
  colorScheme = colorScheme || 'light';
  menuData = menuData || {}

  return (
    <header id="header" data-color-scheme={colorScheme}>
      <WipeLink className="home" linktype="nav" to="/"><Wordmark /></WipeLink>
      <Hamburger handleMainNavToggle={handleMainNavToggle} />
    </header>
  );
}

export default Header;