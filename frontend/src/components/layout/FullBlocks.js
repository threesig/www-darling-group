import React, { useContext, useRef, useEffect } from 'react';
import { FullBlocksContext } from '../contexts/FullBlocksContext';

const FullBlocks = props => {
  const refFullBlocks = useRef(null);
  const { setPageHasScroll } = useContext(FullBlocksContext);

  const normalizeBlocks = () => props.children.map(childBlock => childBlock.constructor === Array ? childBlock : [childBlock]);
  const getBlockCount = () => props.children ? normalizeBlocks().reduce((blockCount, blockContainer) => blockCount + blockContainer.length, 0) : 0;

  const blockCount = getBlockCount();
  let blockIndex = blockCount > 0 ? 1 : 0;

  let lastScrollTimestamp = 0;

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
  const handleMouseWheel = e => {
    // Event only fires if FullBlocks has not scrolled.  Must be locked in place.
    if (refFullBlocks.current.scrollTop === 0) {
      e.preventDefault();

      // Debouncer
      const scrollTimeout = 50; // there has to be at least 1 second between event fires to determine a single scroll event
      if (e.timeStamp - lastScrollTimestamp >= scrollTimeout) {
        // Determine Scroll Direction
        const direction = e.deltaY > 0 ? 'forward' : 'backward';
        switch (direction) {
          case 'forward':
            advanceBlock(1);
            break;
          case 'backward':
            advanceBlock(-1);
            break;
          default:
          // Do nothing
        }
      }
      lastScrollTimestamp = e.timeStamp;
    }
  }
  const handleKeyDown = e => {
    let ret = true;
    if (refFullBlocks.current.scrollTop === 0) {
      const validKeys = ['ArrowDown', 'ArrowUp'];
      if (validKeys.includes(e.code)) {
        ret = false; // Hijack this key
        switch (e.code) {
          case 'ArrowDown':
            advanceBlock(1);
            break;
          case 'ArrowUp':
            advanceBlock(-1);
            break;
          default:
          // Do Nothing
        }
      }
    }
    return ret;
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
    const fullBlocks = refFullBlocks.current;
    const nextLinks = fullBlocks.querySelectorAll('.next');

    // Initialize scrollability;
    setPageHasScroll(blockIndex === blockCount);


    addRemoveEventListenerList('add', nextLinks, 'click', handleNextClick);
    fullBlocks.addEventListener('mousewheel', handleMouseWheel);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      addRemoveEventListenerList('remove', nextLinks, 'click', handleNextClick);
      fullBlocks.removeEventListener('mousewheel', handleMouseWheel);
      window.removeEventListener('keydown', handleKeyDown);

    }
  }, []);

  return (
    <div id="FullBlocks" ref={refFullBlocks} data-block-count={blockCount} data-block-index={blockIndex}>
      {props.children}
    </div>
  );
}
export default FullBlocks;