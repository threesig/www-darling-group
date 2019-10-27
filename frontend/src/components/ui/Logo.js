import React from 'react';
export default class Logo extends React.Component {
  static defaultProps = {
    color: '#f00',
    hw: 50
  };
  render() {
    return (
      <svg className="Logo" height={this.props.hw} width={this.props.hw} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 20C0 8.954 8.954 0 20 0s20 8.954 20 20-8.954 20-20 20S0 31.046 0 20zm13 9h6.826C25.08 29 29 25.916 29 20.488 29 15.059 25.079 12 19.8 12H13v17z" fillRule="evenodd" />
      </svg>
    );
  }
}