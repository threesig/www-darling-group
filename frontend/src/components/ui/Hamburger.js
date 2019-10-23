import React from 'react';
const Hamburger = props => {
  const {handleMainNavToggle} = props;
  return (
    <button className="hamburger" title="Menu Toggle" onClick={handleMainNavToggle}>
      <div className="interior">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </button>
  );
}
export default Hamburger;