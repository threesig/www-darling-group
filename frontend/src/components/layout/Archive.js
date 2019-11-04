import React from 'react';
import ArchiveItem from './ArchiveItem';
import Page from './Page';
import '../layout/FullBlocks';
import FullBlocks from '../layout/FullBlocks';
const Archive = props => {
  const {pageKey, query} = props;
  const buildRepeaterKey = idx => `${pageKey}-${idx}`;
  const renderArchiveItem = (post, idx) => <li key={buildRepeaterKey(idx)} className="item-work" ><ArchiveItem post={post} /></li>
  return (
    <Page location={props.location}>
      <FullBlocks />
      <div className="block page-heading color-scheme-light">
        <div className="interior">
          <h1 className="title">Our Work</h1>
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