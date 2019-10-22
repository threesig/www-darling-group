import React, { useState, useEffect, useRef } from 'react';
import Block from './Block';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import menus from '../../data/menus';
import {getColorScheme} from '../../helpers';

const Page = props => {
  const refBlocks = useRef(null);
  let blockPositions = null;


  const getBlockPositions = () => {
    const blocks = refBlocks.current.childNodes;
    const blockPositions = {};
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const colorSchemeContainer = [...block.classList].filter(myClass => myClass.startsWith('color-scheme'));
      if (colorSchemeContainer.length) {
        blockPositions[block.offsetTop] = colorSchemeContainer[0];
      }
    }
    return blockPositions;
  }
  const setBlockPositions = () => {
    blockPositions = getBlockPositions();
  }



  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [bodyOffset, setBodyOffset] = useState(document.body.getBoundingClientRect());
  const [scrollY, setScrollY] = useState(bodyOffset.top);
  const [scrollDirection, setScrollDirection] = useState();

  const scrollListener = (e) => {
    setBodyOffset(document.body.getBoundingClientRect());
    setScrollY(-bodyOffset.top);
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up');
    setLastScrollTop(-bodyOffset.top);
  };
  const resizeListener = (e) => {
    setBlockPositions();    
  }

  // After Render, fire once;
  useEffect(() => {
    setBlockPositions();

    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.addEventListener('resize', resizeListener);
    };
  }, []);

















  
  return (
    <div id="page" scrolly={scrollY}>
      <Header menuData={menus.main} />
      <div id="wrap">
        <MainNavigation menuData={menus.main} />
        <div id="main">
          <div className="blocks" ref={refBlocks}>
            {props.children}
          </div>
        </div>
        <Footer menuData={menus} />
      </div>
    </div>
  );
}
export default Page;