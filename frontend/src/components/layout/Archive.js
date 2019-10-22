import React from 'react';
import ArchiveItem from './ArchiveItem';
const Archive = props => {
  const {pageKey, query} = props;
  const buildRepeaterKey = idx => `${pageKey}-${idx}`;
  const renderArchiveItem = (post, idx) => <li key={buildRepeaterKey(idx)} className="item-work" ><ArchiveItem post={post} /></li>
  return (
    <>
      <div className="block archive-heading color-scheme-light">
        <div className="interior">
          <h1 className="page-title">Our Work</h1>
        </div>
      </div>
      <div className="block archive color-scheme-light">
        <div className="interior">
          <ul className="Archive list-work">
            {query.map(renderArchiveItem)}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Archive;