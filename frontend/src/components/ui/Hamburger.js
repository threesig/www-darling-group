import React from 'react';
export default class Hamburger extends React.Component {
  render() {
    return (
      <button className="hamburger" title="Menu Toggle">
        <div className="interior">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </button>
    );
  }
}