import React from 'react';
import Block from '../Block';
import Page from '../Page';
import WipeLink from '../../ui/WipeLink';
import FullBlocks from '../FullBlocks';

const ProjectSingle = props => {

  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  const { post_title, casestudySubtitle, casestudyImage, post_name } = props.query[0];
  console.log(props.query[0]);

  const imageBlockData = {
    acf_fc_layout: 'image',
    image: casestudyImage,
    type: 'hero'
  }
  return (
    <Page location={props.location}>
      <FullBlocks />
      <div className="block page-heading color-scheme-light">
        <div className="interior">
          <h1 className="title">{post_title}</h1>
          <div className="content"><p>{casestudySubtitle}</p></div>
        </div>
      </div>
      <Block key={`project-${post_name}`} data={imageBlockData} />
      {blocks.map(getBlock)}
      <div className="block project-pagination color-scheme-light">
        <div className="interior">
          <WipeLink className="go" to={`/projects/${props.next}`}>Next</WipeLink>
        </div>
      </div>
    </Page>
  )
}

export default ProjectSingle