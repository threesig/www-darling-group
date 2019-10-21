import React from 'react';
import ArchiveItem from './ArchiveItem';
export default class Archive extends React.Component {
  buildRepeaterKey = idx => `${this.pageKey}-${idx}`;
  renderArchiveItem = (post, idx) => <li key={this.buildRepeaterKey(idx)} className="item-work" ><ArchiveItem post={post} /></li>
  render() {
    const { query } = this.props;
    return (
      <>
        <h1 className="page-title">Our Work</h1>
        <ul className="Archive list-work">
          {query.map(this.renderArchiveItem)}
        </ul>
      </>
    );
  }
}