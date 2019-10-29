import React from 'react';
import Block from '../Block';
import Page from '../Page';
import Contact from '../Contact';
import FullBlocks from '../FullBlocks';

const DefaultPage = props => {
  const buildBlockData = casestudy => {
    return {
      acf_fc_layout: 'showcase',
      title: casestudy.post_title,
      content: casestudy.showcaseContent,
      image: casestudy.showcaseImage,
      slug: casestudy.post_name
    }
  }
  const renderShowcases = (casestudy, idx) => <Block key={getKey(idx)} data={{ ...buildBlockData(casestudy), blockIdx: idx }} />
  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  return (
    <Page>
      <FullBlocks>

      </FullBlocks>
      {blocks.map(getBlock)}
      <Contact />
    </Page>
  )
}

export default DefaultPage