import React, { useContext, useRef, useEffect } from 'react';
import { blockParams } from 'handlebars';
import { FullBlocksContext } from '../contexts/FullBlocksContext';
const FullBlocks = props => {
  const refFullBlocks = useRef(null);
  const { fullBlockCount, setFullBlockCount, fullBlockIndex, setFullBlockIndex } = useContext(FullBlocksContext);

  const normalizeBlocks = () => props.children.map(childBlock => childBlock.constructor === Array ? childBlock : [childBlock]);
  const getBlockCount = () => props.children ? normalizeBlocks().reduce((blockCount, blockContainer) => blockCount + blockContainer.length, 0) : 0;
  const blockCount = getBlockCount();

  const activeClass = 'active';
  const advanceBlock = (direction) => {
    // Integer.  +1 Forward or -1 Backward.
    direction = direction || 1;

    const { children } = props;
    if (children) {
      const activeOrInactiveChildren = children.filter(block => {
        let { classNames } = block.props.data;
        classNames = classNames || '';

        return direction > 0  // Scrolling Forward
          ? !classNames.split(' ').includes(activeClass) // find classes that are NOT active. Return the FIRST one to make it active.
          : classNames.split(' ').includes(activeClass); // Find classes that ARE active.  Return the LAST one to make it inactive.

        // ~~~TODO: GOING IN REVERSE, WE NEVER REMOVE `Active` FROM THE FIRST BLOCK
      });

      switch (direction > 0) {
        case true: // Moving Forward
          const nextBlock = activeOrInactiveChildren[0] // Return First Inactive block, so it can be made Active

          break;
        default:  // Moving Backward
          // First block always stays Active.
          if (activeOrInactiveChildren.length > 1) {
            const prevBlock = activeOrInactiveChildren.pop();
          }
      }
    }
  }


  useEffect(() => {
    console.log('backward!', advanceBlock(-1));
  }, []);

  setFullBlockCount(blockCount);
  setFullBlockIndex(blockCount > 0 ? 1 : 0);
  return (
    <div id="FullBlocks" ref={refFullBlocks} data-block-count={fullBlockCount} data-block-index={fullBlockIndex}>
      {props.children}
    </div>
  );
}
export default FullBlocks;