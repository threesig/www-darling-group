import React from 'react';
import ArchiveItem from './ArchiveItem';
const Archive = props => {
  const {pageKey, query} = props;
  const buildRepeaterKey = idx => `${pageKey}-${idx}`;
  const renderArchiveItem = (post, idx) => <li key={buildRepeaterKey(idx)} className="item-work" ><ArchiveItem post={post} /></li>
  return (
    <>
      <h1 className="page-title">Our Work</h1>
      <ul className="Archive list-work">
        {query.map(renderArchiveItem)}
      </ul>
    </>
  );
}
export default Archive;