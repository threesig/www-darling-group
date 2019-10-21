import React from 'react';
import Page from '../Page';
import { Link } from 'react-router-dom';
import Image from '../../ui/Image';

export default class ProjectSingle extends Page {
  hookBeforeContentBlocks = () => {
    const { post_title, profileSubtitle, showcaseImage, post_name } = this.props.query[0];
    return (
      <>
        <h1 className="page-title">{post_title}</h1>
        <h2 className="page-subtitle">{profileSubtitle}</h2>
        <Image key={`${post_name}-featured-image`} data={showcaseImage} />
      </>
    )
  }
  hookPagination = () => <Link to={`/projects/${this.props.next}`}>Next</Link>
}