import React, { useState, useLayoutEffect, useRef, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import menus from '../../data/menus';
import { FullBlocksContext } from '../contexts/FullBlocksContext';
import { getMetaTags } from '../../helpers';
const Page = props => {
  const refBlocks = useRef(null);
  const refMain = useRef(null);


  // Return an object containing all page blocks, and their color schemes. { int pos: string scheme }
  const getBlockPositions = () => {
    const blocks = refBlocks.current.querySelectorAll('.block');

    const blockPositions = {};
    const colorSchemeRoot = 'color-scheme-';

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const colorSchemeContainer = [...block.classList].filter(myClass => myClass.startsWith(colorSchemeRoot));
      if (colorSchemeContainer.length) {
        blockPositions[block.offsetTop - refMain.current.offsetTop] = colorSchemeContainer[0].substring(colorSchemeRoot.length);
      }
    }
    return blockPositions;
  }


  const getHeaderColorScheme = () => {

    // All blocks whose positions are less than scrollY
    const blocksAboveScroll = Object.keys(blockPositions).filter(posVal => parseInt(posVal) <= scrollY + 64);

    // The current block is the last block in the list.  pop method returns the color scheme;
    return blockPositions[blocksAboveScroll.pop()]
  }


  const { pageHasScroll } = useContext(FullBlocksContext);

  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect());
  const [scrollY, setScrollY] = useState();
  const [scrollDirection, setScrollDirection] = useState();
  const [headerColorScheme, setHeaderColorScheme] = useState();
  const [lastHeaderColorScheme, setLastHeaderColorScheme] = useState();
  const [blockPositions, setBlockPositions] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollListener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(refMain.current.scrollTop);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
    setLastScrollTop(-bodyOffset.top);
    setHeaderColorScheme(getHeaderColorScheme());
  };
  const resizeListener = (e) => {
    setBlockPositions(getBlockPositions());
  }




  const handleMainNavToggle = e => {
    e.preventDefault();
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setLastHeaderColorScheme(headerColorScheme);
      setHeaderColorScheme('dark');
    }
    else {
      setHeaderColorScheme(lastHeaderColorScheme);
    }
  }

  // After Render, fire once;
  useLayoutEffect(() => {
    window.addEventListener('resize', resizeListener);
    resizeListener(); // do an init resize fire to calculate block positions
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  // Try useLayoutEffect?
  useLayoutEffect(() => {
    refMain.current.addEventListener('scroll', scrollListener);
    return () => {
      refMain.current.removeEventListener('scroll', scrollListener);
    };
  });

  return (
    <div id="page" data-is-menu-open={isMenuOpen} data-has-scroll={pageHasScroll}>
      {getMetaTags(props.location.pathname)}
      <Header menuData={menus.main} colorScheme={headerColorScheme} handleMainNavToggle={handleMainNavToggle} />
      <div id="wrap">
        <MainNavigation menuData={menus.main} />
        <div id="main" ref={refMain}>
          <div className="blocks" ref={refBlocks}>
            {props.children}
          </div>
          <Footer menuData={menus} />
        </div>
      </div>
    </div>
  );
}
export default Page;