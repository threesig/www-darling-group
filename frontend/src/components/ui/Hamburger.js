import React from 'react';
const Hamburger = props => {
  const {isMenuOpen, setIsMenuOpen} = props;
  const handleHamburgerClick = e => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <button className="hamburger" title="Menu Toggle" onClick={handleHamburgerClick}>
      <div className="interior">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </button>
  );
}
export default Hamburger;