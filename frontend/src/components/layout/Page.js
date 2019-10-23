import React, { useState, useEffect, useRef } from 'react';
import Block from './Block';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import menus from '../../data/menus';

const Page = props => {
  const refBlocks = useRef(null);
  const refMain = useRef(null);
  

  // Return an object containing all page blocks, and their color schemes. { int pos: string scheme }
  const getBlockPositions = () => {
    const blocks = refBlocks.current.childNodes;

    const blockPositions = {};
    const colorSchemeRoot = 'color-scheme-';

    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const colorSchemeContainer = [...block.classList].filter(myClass => myClass.startsWith(colorSchemeRoot));
      if (colorSchemeContainer.length) {
        blockPositions[block.offsetTop] = colorSchemeContainer[0].substring(colorSchemeRoot.length);
      }
    }
    return blockPositions;
  }

  
  const getHeaderColorScheme = () => {
    
    // adjust when the transition happens.
    const transitionGutter = 64;
    const transitionModifier = scrollDirection === 'up' ? transitionGutter : -transitionGutter;
  
  
    // All blocks whose positions are less than scrollY
    const blocksAboveScroll = Object.keys(blockPositions).filter(posVal => parseInt(posVal) <= scrollY + transitionModifier);
    
    // The current block is the last block in the list.  pop method returns the color scheme;
    return blockPositions[blocksAboveScroll.pop()]
  }




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
  useEffect(() => {
    window.addEventListener('resize', resizeListener);
    resizeListener(); // do an init resize fire to calculate block positions
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);


  useEffect(() => {
    refMain.current.addEventListener('scroll', scrollListener);
    return () => {
      refMain.current.removeEventListener('scroll', scrollListener);
    };
  });

  return (
    <div id="page">
      <Header menuData={menus.main} colorScheme={headerColorScheme} handleMainNavToggle={handleMainNavToggle} />
      <div id="wrap" data-is-menu-open={isMenuOpen}>
        <MainNavigation menuData={menus.main} />
        <div id="main" ref={refMain} scrolly={scrollY}>
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