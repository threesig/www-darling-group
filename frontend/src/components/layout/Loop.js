import React from 'react';
import Page from './Page';
import Archive from './Archive';


export default class Loop extends React.Component {
  static defaultProps = {
    query: []
  }
  getLoopTemplate = () => {
    const { query } = this.props;
    switch (query.length) {
      case 0:
        return <p>404!</p>;
      case 1:
        return <Page query={query} />
      default:
        return <Archive query={query} />
    }
  }
  render() {
    return (
      <>
        {this.getLoopTemplate()}
      </>
    );
  }
}