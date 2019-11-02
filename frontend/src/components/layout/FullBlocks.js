import React, { useContext, useRef, useEffect } from 'react';
import { blockParams } from 'handlebars';
import { FullBlocksContext } from '../contexts/FullBlocksContext';
const FullBlocks = props => {
  const refFullBlocks = useRef(null);
  const { setPageHasScroll } = useContext(FullBlocksContext);

  const normalizeBlocks = () => props.children.map(childBlock => childBlock.constructor === Array ? childBlock : [childBlock]);
  const getBlockCount = () => props.children ? normalizeBlocks().reduce((blockCount, blockContainer) => blockCount + blockContainer.length, 0) : 0;

  const blockCount = getBlockCount();
  let blockIndex = blockCount > 0 ? 1 : 0;
  setPageHasScroll(blockIndex === blockCount);

  const activeClass = 'active';
  const advanceBlock = (direction) => {
    // Integer.  +1 Forward or -1 Backward.
    direction = direction || 1;

    const { children } = refFullBlocks.current;
    if (children) {
      const activeOrInactiveBlocks = [...children].filter(block => {
        const blockClassList = [...block.classList];
        return direction > 0  // Scrolling Forward
          ? !blockClassList.includes(activeClass) // find classes that are NOT active. Return the FIRST one to make it active.
          : blockClassList.includes(activeClass); // Find classes that ARE active.  Return the LAST one to make it inactive.
      });

      switch (direction > 0) {
        case true: // Moving Forward
          /** activeOrInactiveBlocks === Inactive **/

          // Can't activate more blocks than we have
          if (activeOrInactiveBlocks.length >= 1) {
            // Next Block is the first Inactive Block
            const nextBlock = activeOrInactiveBlocks[0]

            // Activate Next Block
            nextBlock.classList.add(activeClass);

            // Recalculate Block Index
            blockIndex++;

          }

          break;
        default:  // Moving Backward
          /** activeOrInactiveBlocks === Active **/

          // First block always stays Active.
          if (activeOrInactiveBlocks.length > 1) {


            // Previous Block is the last Active Block
            const prevBlock = activeOrInactiveBlocks.pop();

            // Deactivate Previous Block
            prevBlock.classList.remove(activeClass);

            // Recalculate Block Inded
            blockIndex--;
          }
      }
      console.log(`ListLength: ${activeOrInactiveBlocks.length} Blocks: ${blockCount}, Index: ${blockIndex}, hasScroll: ${blockIndex === blockCount}`);
      setPageHasScroll(blockIndex === blockCount);
    }
  }

  const handleNextClick = e => {
    e.preventDefault();
    advanceBlock(1);
  }

  const addRemoveEventListenerList = (addOrRemove, list, event, fn) => {
    for (var i = 0, len = list.length; i < len; i++) {
      switch (addOrRemove) {
        case 'add':
          list[i].addEventListener(event, fn);
          break;
        case 'remove':
          list[i].addEventListener(event, fn);
          break;
        default:
        // Do nothing
      }
    }
  }

  useEffect(() => {
    // Advance on all Next links
    const nextLinks = refFullBlocks.current.querySelectorAll('.next');
    addRemoveEventListenerList('add', nextLinks, 'click', handleNextClick);



    return () => {
      addRemoveEventListenerList('remove', nextLinks, 'click', handleNextClick);
    }
  }, []);

  return (
    <div id="FullBlocks" ref={refFullBlocks} data-block-count={blockCount} data-block-index={blockIndex}>
      {props.children}
    </div>
  );
}
export default FullBlocks;