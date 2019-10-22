import React from 'react';
import ArchiveItem from './ArchiveItem';
import Page from './Page';
const Archive = props => {
  const {pageKey, query} = props;
  const buildRepeaterKey = idx => `${pageKey}-${idx}`;
  const renderArchiveItem = (post, idx) => <li key={buildRepeaterKey(idx)} className="item-work" ><ArchiveItem post={post} /></li>
  return (
    <Page>
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
    </Page>
  );
}
export default Archive;