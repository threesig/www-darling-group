import React from 'react';
import Block from '../Block';
import Page from '../Page';
import Contact from '../Contact';

export default class Homepage extends Page {
  buildBlockData = casestudy => {
    return {
      acf_fc_layout: 'showcase',
      title: casestudy.post_title,
      content: casestudy.showcaseContent,
      image: casestudy.showcaseImage,
      slug: casestudy.post_name
    }
  }
  renderShowcases = (casestudy, idx) => <Block key={this.getKey(idx)} data={{ ...this.buildBlockData(casestudy), blockIdx: idx }} />

  hookAfterContentBlocks = () => {
    return (
      <>
        {this.props.featured.map(this.renderShowcases)}
        <Contact />
      </>
    )
  };
}