import React, {useContext, useRef, useEffect} from 'react';
import { blockParams } from 'handlebars';
import {FullBlocksContext} from '../contexts/FullBlocksContext';
const FullBlocks = props => {
  const refFullBlocks = useRef(null);
  const {fullBlockCount, setFullBlockCount, fullBlockIndex, setFullBlockIndex} = useContext(FullBlocksContext);

  const normalizeBlocks = () => props.children.map(childBlock => childBlock.constructor === Array ? childBlock: [childBlock]);
  const getBlockCount = () => props.children?normalizeBlocks().reduce((blockCount, blockContainer) => blockCount + blockContainer.length, 0):0;
  const blockCount = getBlockCount();
  
  setFullBlockCount(blockCount);
  setFullBlockIndex(blockCount>0? 1: 0);
  return (
    <div id="FullBlocks" ref={refFullBlocks} data-block-count={fullBlockCount} data-block-index={fullBlockIndex}>
      {props.children}
    </div>
  );
}
export default FullBlocks;