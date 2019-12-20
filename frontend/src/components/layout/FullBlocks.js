import React, { useContext, useRef, useEffect } from 'react';
import { FullBlocksContext } from '../contexts/FullBlocksContext';
import { ColorSchemeContext } from '../contexts/ColorSchemeContext';

import { getMainScrollY, extractColorScheme, isFullScreen, swipeDetect } from '../../helpers';
import Lethargy from '../../lib/lethargy';
import {isMobile} from 'react-device-detect';

const FullBlocks = props => {
  let fullBlocks;
  const refFullBlocks = useRef(null);
  const { setPageHasScroll } = useContext(FullBlocksContext);
  const { setHeaderColorScheme } = useContext(ColorSchemeContext);
  const lethargy = new Lethargy();
  const normalizeBlocks = () => props.children.map(childBlock => childBlock.constructor === Array ? childBlock : [childBlock]);
  const getBlockCount = () => props.children ? normalizeBlocks().reduce((blockCount, blockContainer) => blockCount + blockContainer.length, 0) : 0;

  const blockCount = getBlockCount();
  let blockIndex = blockCount > 0 ? 1 : 0;
  const activeClass = 'active';

  const getActiveOrInactiveBlocks = direction => {
    const ret = [...fullBlocks.children].filter(block => {
      const blockClassList = [...block.classList];
      return direction > 0  // Scrolling Forward
        ? !blockClassList.includes(activeClass) // find classes that are NOT active. Return the FIRST one to make it active.
        : blockClassList.includes(activeClass); // Find classes that ARE active.  Return the LAST one to make it inactive.
    });
    return ret;
  }
  const getActiveBlocks = () => getActiveOrInactiveBlocks(-1);
  const advanceBlock = (direction) => {
    // Integer.  +1 Forward or -1 Backward.
    direction = direction || 1;
    const { children } = fullBlocks;
    if (children) {

      switch (direction > 0) {
        case true: // Moving Forward
          /** activeOrInactiveBlocks === Inactive **/

          if (!isListEnd()) {
            // Next Block is the first Inactive Block
            const inactiveBlocks = getActiveOrInactiveBlocks(direction);
            const nextBlock = inactiveBlocks[0];

            // Activate Next Block
            nextBlock.classList.add(activeClass);

            // Recalculate Block Index
            blockIndex++;
            // refFullBlocks.current.setAttribute('data-block-index', blockIndex);
          }
          else {
            // console.log('Sorry, End of List!');
          }
          break;
        default:  // Moving Backward
          /** activeOrInactiveBlocks === Active **/
          if (!isListBeginning()) {
            // Previous Block is the last Active Block
            const activeBlocks = getActiveOrInactiveBlocks(direction);
            const prevBlock = activeBlocks.pop();

            // Deactivate Previous Block
            prevBlock.classList.remove(activeClass);

            // Recalculate Block Inded
            blockIndex--;
            // refFullBlocks.current.setAttribute('data-block-index', blockIndex);
          }
          else {
            // console.log('Sorry, beginning of list!');
          }
      }
      const activeBlock = getActiveBlocks().pop();
      if (isFullScreen(activeBlock)) {
        setHeaderColorScheme(extractColorScheme(activeBlock.classList));
      }
      document.getElementById('page').setAttribute('data-has-scroll', blockIndex === blockCount);
    }
  }
  const handleNextClick = e => {
    e.preventDefault();
    advanceBlock(1);
  }

  const handleSwipe = swipeDir => {
    let advanceDirVal;
    switch (swipeDir) {
      case 'up':
        advanceDirVal = 1;
        break;
      case 'down':
        advanceDirVal = -1;
        break;
      default:
      // Do Nothing
    }
    advanceBlock(advanceDirVal);
  }


  const isListBeginning = () => {
    return blockIndex === 1;
  }
  const isListEnd = () => {
    return blockIndex === blockCount;
  }



  let scrollLocked = false;
  let scrollTimer = false;
  const scrollTimeout = 500; // there has to be at least 1 second between event fires to determine a single scroll event
  const handleScroll = e => {
    const scrollY = getMainScrollY();
    if (!isListEnd() || (!isListBeginning() && scrollY === 0)) {
      // e.preventDefault();
      // e.stopPropagation();
      const result = lethargy.check(e);

      const direction = result < 0
        ? 'forward'
        : result > 0
          ? 'backward'
          : false;


      if (direction && !scrollLocked) {
        scrollLocked = true;
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
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          scrollLocked = false;
        }, scrollTimeout);
      }
    }
    else {
      // console.log('Not scrolling for some reason.');
    }
  }
  const handleKeyDown = e => {
    let ret = true;
    if (fullBlocks.scrollTop === 0) {
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


  useEffect(() => {
    // Advance on all Next links
    fullBlocks = document.getElementById('FullBlocks');
    const nextLinks = fullBlocks.querySelectorAll('.BlockNext');

    // Initialize scrollability;
    setPageHasScroll(blockIndex === blockCount);


    addRemoveEventListenerList('add', nextLinks, 'click', handleNextClick);


    fullBlocks.addEventListener('mousewheel', handleScroll);
    fullBlocks.addEventListener('DOMMouseScroll', handleScroll);
    fullBlocks.addEventListener('wheel', handleScroll);
    fullBlocks.addEventListener('MozMousePixelScroll', handleScroll);

    swipeDetect(fullBlocks, handleSwipe);
    

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
  const getClassNames = () => {
    return [
      'FullBlocks',
      'full-height',
      `block-count-${blockCount}`
    ].join(' ');
  }
  return (
    <div className={getClassNames()} id="FullBlocks" ref={refFullBlocks} data-is-mobile={isMobile} data-block-count={blockCount} data-block-index={blockIndex}>
      {props.children}
    </div>
  );
}
export default FullBlocks;