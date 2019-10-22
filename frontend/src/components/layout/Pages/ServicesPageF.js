import React from 'react';
import Block from '../Block';
import PageF from '../PageF';
import Contact from '../Contact';

const ServicesPageF = props => {

  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  return (
    <PageF>
      {blocks.map(getBlock)}
      <Contact />
    </PageF>
  )
}

export default ServicesPageF