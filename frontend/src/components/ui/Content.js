import React from 'react';
export default class Content extends React.Component {
  static defaultProps = {
    markup: '',
  };
  render() {
    return (
      <div className="content" dangerouslySetInnerHTML={{ __html: this.props.markup }} />
    );
  }
}