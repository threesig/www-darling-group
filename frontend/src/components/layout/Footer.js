import React from 'react';
import Logo from '../ui/Logo';
import Menu from './Menu';
const Footer = props => {
  const {menuData} = props;
  return (
    <footer key="site-footer" id="footer">
      <div className="interior">
        <div className="cell">
          <Logo />
          <h3 className="tagline">Darling, be different.</h3>
        </div>
        <div className="cell">
          <Menu items={menuData.main} />
          <p className="copyright">&copy; 2019 Darling Group LLC</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;