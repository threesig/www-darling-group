import React, { useEffect } from 'react';
import Block from './Block';
const PageF = props => {
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const setBlockPositions = () => {
    const blocks = document.querySelectorAll('.block');
    console.log(blocks);
    const blockPositions = {};
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const colorSchemeContainer = [...block.classList].filter(myClass => myClass.startsWith('color-scheme'));
      if (colorSchemeContainer.length) {
        blockPositions[block.offsetTop] = colorSchemeContainer[0];
      }
      console.log(colorSchemeContainer);
    }
    return blockPositions;
  }
  useEffect(() => {
    console.log(setBlockPositions());
  })
  const hookBeforeContentBlocks = () => {/* Override Me */ }
  const hookAfterContentBlocks = () => {/* Override Me */ }
  const hookPagination = () => {/* Override Me */ }
  const { blocks } = props.query[0];

  return (
    <div id="page">
      {hookBeforeContentBlocks()}
      {blocks.map(getBlock)}
      {hookAfterContentBlocks()}
      {hookPagination()}}
    </div>
  );
}
export default PageF;