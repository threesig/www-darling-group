import React, {useContext} from 'react';
import Block from '../Block';
import Page from '../Page';
import Contact from '../Contact';
import {FullBlocksContext} from '../../contexts/FullBlocksContext';

const Homepage = props => {
  const {fullBlockCount, setFullBlockCount, fullBlockIndex, setFullBlockIndex, setHasScroll} = useContext(FullBlocksContext);
  const buildBlockData = casestudy => {
    return {
      acf_fc_layout: 'showcase',
      title: casestudy.post_title,
      content: casestudy.showcaseContent,
      image: casestudy.showcaseImage,
      slug: casestudy.post_name,
      colorScheme: 'dark',
      classNames: casestudy.post_name
    }
  }
  const renderShowcases = (casestudy, idx) => <Block key={getKey(idx)} data={{ ...buildBlockData(casestudy), blockIdx: idx }} />
  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  
  setFullBlockCount(blocks.length + props.featured.length + 1);
  setFullBlockIndex(8);
  return (
    <Page>
      {blocks.map(getBlock)}
      {props.featured.map(renderShowcases)}
      <Contact />
    </Page>
  )
}

export default Homepage