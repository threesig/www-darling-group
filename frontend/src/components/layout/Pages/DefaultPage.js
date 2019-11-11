import React from 'react';
import Block from '../Block';
import Page from '../Page';
import Contact from '../Contact';
import FullBlocks from '../FullBlocks';
import { categorizeBlocks, prepFullBlocks } from '../../../helpers';

const DefaultPage = props => {
  const buildBlockData = casestudy => {
    return {
      acf_fc_layout: 'jumbotron',
      title: casestudy.post_title,
      content: casestudy.jumbotronContent,
      image: casestudy.jumbotronImage,
      slug: casestudy.post_name
    }
  }
  const renderShowcases = (casestudy, idx) => <Block key={getKey(idx)} data={{ ...buildBlockData(casestudy), blockIdx: idx }} />
  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  const catBlocks = categorizeBlocks(blocks);
  return (
    <Page location={props.location}>
      <FullBlocks>
        {catBlocks.full.length ? prepFullBlocks(catBlocks.full).map(getBlock) : null}
      </FullBlocks>
      {catBlocks.standard.length ? catBlocks.standard.map(getBlock) : null}
      <Contact />
    </Page>
  )
}

export default DefaultPage