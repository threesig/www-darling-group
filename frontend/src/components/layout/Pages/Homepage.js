import React from 'react';
import Block from '../Block';
import Page from '../Page';
// import Contact from '../Contact';
import FullBlocks from '../FullBlocks';
import { prepFullBlocks } from '../../../helpers';

const Homepage = props => {
  const buildBlockData = casestudy => {
    return {
      acf_fc_layout: 'jumbotron',
      title: casestudy.post_title,
      content: casestudy.jumbotronContent,
      image: casestudy.jumbotronImage,
      imagePosition: `${casestudy.jumbotronImagePosition}%`,
      slug: casestudy.post_name,
      colorScheme: 'dark',
      classNames: casestudy.post_name
    }
  }
  const renderShowcases = (casestudy, idx) => <Block key={getKey(idx)} data={{ ...buildBlockData(casestudy), blockIdx: idx }} />
  const getBlock = (blockData, idx) => <Block key={getKey(idx)} blockIndex={idx} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];

  const allBlocks = prepFullBlocks(blocks, props.featured.map(buildBlockData), { acf_fc_layout: 'contact' });

  return (
    <Page location={props.location}>
      <FullBlocks>
        {allBlocks.map(getBlock)}
      </FullBlocks>
    </Page>
  )
}

export default Homepage