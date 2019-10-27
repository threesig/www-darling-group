import React, {useState} from 'react';
const Hamburger = props => {
  const {handleMainNavToggle} = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    handleMainNavToggle(e);
    setIsOpen(!isOpen);
  }

  const readiedAction = isOpen ? 'Close' : 'Open';

  return (
    <button className="hamburger" title={`${readiedAction} Menu`} onClick={handleClick}>
      <div className="interior">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </button>
  );
}
export default Hamburger;