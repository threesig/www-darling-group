import React from 'react';
import Block from './Block';
export default class Page extends React.Component {
  getKey = idx => `${this.props.pageKey}-block-${idx}`;
  getBlock = (blockData, idx) => <Block key={this.getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  setBlockPositions = () => {
    const blocks = document.querySelectorAll('.block');
    const blockPositions = {};
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      const colorSchemeContainer = [...block.classList].filter(myClass => myClass.startsWith('color-scheme'));
      if (colorSchemeContainer.length) {
        blockPositions[block.offsetTop] = colorSchemeContainer[0];
      }
    }
    this.blockPositions = blockPositions;
  }
  componentDidMount() {
    this.setBlockPositions();
  }
  hookBeforeContentBlocks = () => {/* Override Me */ }
  hookAfterContentBlocks = () => {/* Override Me */ }
  hookPagination = () => {/* Override Me */ }
  render() {
    const { blocks } = this.props.query[0];
    return (
      <div id="page" ref={this.refPage}>
        {this.hookBeforeContentBlocks()}
        {blocks.map(this.getBlock)}
        {this.hookAfterContentBlocks()}
        {this.hookPagination()}
      </div>
    );
  }
}