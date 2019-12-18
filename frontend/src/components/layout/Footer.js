import React from 'react';
import Logo from '../ui/Logo';
import Menu from './Menu';
const Footer = props => {
  const { menuData } = props;
  return (
    <footer key="site-footer" id="Footer">
      <div className="interior">
        <div className="cell a">
          <div className="logo-housing">
            <div className="cell logo"><Logo /></div>
            <div className="cell text"><h3 className="tagline">design with heart</h3></div>
          </div>
        </div>
        <div className="cell b">
          <Menu items={menuData.main} />
        </div>
        <div className="cell c">
          <p className="copyright">&copy; 2019 Darling Group, LLC</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;