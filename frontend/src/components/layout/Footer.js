import React from 'react';
import Logo from '../ui/Logo';
import Menu from './Menu';
export default class Footer extends React.Component {
  render() {
    console.log(this.props);
    return (
      <footer id="footer">
        <div className="interior">
          <div className="cell">
            <Logo />
            <h3 className="tagline">Darling, be different.</h3>
          </div>
          <div className="cell">
            <Menu items={this.props.menuData.main} />
            <p className="copyright">&copy; 2019 Darling Group LLC</p>
          </div>
        </div>
      </footer>
    );
  }
}