import React, { useContext, useRef, useEffect } from 'react';
import { FullBlocksContext } from '../contexts/FullBlocksContext';
import { getMainScrollY } from '../../helpers';
import Lethargy from '../../lib/lethargy';

const FullBlocks = props => {
  const refFullBlocks = useRef(null);
  const { setPageHasScroll } = useContext(FullBlocksContext);
  const lethargy = new Lethargy();
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

          if (!isListEnd()) {
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
          if (!isListBeginning()) {
            // Previous Block is the last Active Block
            const prevBlock = activeOrInactiveBlocks.pop();

            // Deactivate Previous Block
            prevBlock.classList.remove(activeClass);

            // Recalculate Block Inded
            blockIndex--;
          }
      }
      setPageHasScroll(blockIndex === blockCount);
    }
  }

  const handleNextClick = e => {
    e.preventDefault();
    advanceBlock(1);
  }

  const isListBeginning = () => {
    return blockIndex === 1;
  }
  const isListEnd = () => {
    return blockIndex === blockCount;
  }
  const handleScroll = e => {
    const scrollY = getMainScrollY();

    if (!isListEnd() || (!isListBeginning() && scrollY === 0)) {
      e.preventDefault();
      e.stopPropagation();
      const result = lethargy.check(e);

      const scrollTimeout = 150; // there has to be at least 1 second between event fires to determine a single scroll event
      if (result && (e.timeStamp - lastScrollTimestamp >= scrollTimeout)) {
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
        e.preventDefault();
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








  // const checkScroll = e => {


  //   // Lethargy.check() must only be called once per mouse event
  //   // If you need to use the result in more than one place
  //   // you MUST store it as a variable and use that variable instead
  //   // See https://github.com/d4nyll/lethargy/issues/5


  //   // false means it's not a scroll intent, 1 or -1 means it is
  //   if (result !== false) {
  //     const direction = result < 0 ? 'forward' : 'backward';
  //     console.log(`direction: ${direction}!`);
  //   } else {
  //     console.log('Inertal Scroll');
  //   }
  // };














  useEffect(() => {
    // Advance on all Next links
    const fullBlocks = refFullBlocks.current;
    const nextLinks = fullBlocks.querySelectorAll('.BlockNext');

    // Initialize scrollability;
    setPageHasScroll(blockIndex === blockCount);


    addRemoveEventListenerList('add', nextLinks, 'click', handleNextClick);


    fullBlocks.addEventListener('mousewheel', handleScroll);
    fullBlocks.addEventListener('DOMMouseScroll', handleScroll);
    fullBlocks.addEventListener('wheel', handleScroll);
    fullBlocks.addEventListener('MozMousePixelScroll', handleScroll);



    window.addEventListener('keydown', handleKeyDown);

    return () => {
      addRemoveEventListenerList('remove', nextLinks, 'click', handleNextClick);
      fullBlocks.removeEventListener('mousewheel', handleScroll);
      fullBlocks.removeEventListener('DOMMouseScroll', handleScroll);
      fullBlocks.removeEventListener('wheel', handleScroll);
      fullBlocks.removeEventListener('MozMousePixelScroll', handleScroll);
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