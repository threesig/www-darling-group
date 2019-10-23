import React, { useState, useEffect, useRef } from 'react';
import Block from './Block';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import menus from '../../data/menus';

const Page = props => {
  const refBlocks = useRef(null);
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

  
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect());
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollDirection, setScrollDirection] = useState();
  const [headerColorScheme, setHeaderColorScheme] = useState();
  const [blockPositions, setBlockPositions] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollListener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
    setLastScrollTop(-bodyOffset.top);
    setHeaderColorScheme(getHeaderColorScheme());
  };
  const resizeListener = (e) => {
    setBlockPositions(getBlockPositions());    
  }

  const getHeaderColorScheme = () => {
    const wheat = Object.keys(blockPositions).filter(posVal => parseInt(posVal) <= scrollY);
    return blockPositions[wheat.pop()]
  }


  // After Render, fire once;
  useEffect(() => {
    setBlockPositions(getBlockPositions());
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);


  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  });

  return (
    <div id="page">
      <Header menuData={menus.main} colorScheme={headerColorScheme} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div id="wrap" data-is-menu-open={isMenuOpen}>
        <MainNavigation menuData={menus.main} />
        <div id="main">
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