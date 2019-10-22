import React, { useEffect } from 'react';
import Block from './Block';
import Header from './Header';
import Footer from './Footer';
import MainNavigation from './MainNavigation';
import menus from '../../data/menus'

const Page = props => {
  const getBlockPositions = () => {
    const blocks = document.querySelectorAll('.block');
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
  useEffect(() => {
    console.log(getBlockPositions());
  })
  
  return (
    <div id="page">
      <Header menuData={menus.main} />
      <div id="wrap">
        <MainNavigation menuData={menus.main} />
        <div id="main">
          {props.children}
        </div>
        <Footer menuData={menus} />
      </div>
    </div>
  );
}
export default Page;