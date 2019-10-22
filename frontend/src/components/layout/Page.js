import React, { useEffect } from 'react';
import Block from './Block';
const Page = props => {
  
  
  const setBlockPositions = () => {
    const blocks = document.querySelectorAll('.block');
    console.log(blocks);
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
    console.log(setBlockPositions());
  })
  

  return (
    <div id="page">
      {props.children}
    </div>
  );
}
export default Page;