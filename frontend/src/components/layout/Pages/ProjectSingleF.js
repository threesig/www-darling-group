import React from 'react';
import Block from '../Block';
import PageF from '../PageF';
import Contact from '../Contact';
import { Link } from 'react-router-dom';
import Image from '../../ui/Image';

const ProjectSingleF = props => {

  const getBlock = (blockData, idx) => <Block key={getKey(idx)} data={{ ...blockData, blockIdx: idx }} />;
  const getKey = idx => `${props.pageKey}-block-${idx}`;
  const { blocks } = props.query[0];
  const { post_title, profileSubtitle, showcaseImage, post_name } = props.query[0];
  const imageBlockData = {
    acf_fc_layout: 'image',
    image: showcaseImage,
    type: 'hero'
  }  
  console.log(blocks);
  return (
    <PageF>
      <div className="block project-heading color-scheme-light">
        <div className="interior">
          <h1 className="page-title">{post_title}</h1>
          <h2 className="page-subtitle">{profileSubtitle}</h2>
        </div>
      </div>
      <Block data={imageBlockData} />
      {blocks.map(getBlock)}
      <Link to={`/projects/${props.next}`}>Next</Link>
    </PageF>
  )
}

export default ProjectSingleF