import React from 'react';
import Image from '../ui/Image';
import { Link } from 'react-router-dom';

export default class ArchiveItem extends React.Component {
  getClassNames = () => {
    return [
      'ArchiveItem',
      'post',
      `type-${this.props.post.post_type}`
    ].join();
  }
  render() {
    const { id, post_title, subtitle, showcaseImage, secondaryImage, post_name } = this.props.post;
    return (
      <article id={`post-${id}`} className={this.getClassNames()}>
        <Image data={secondaryImage || showcaseImage} />
        <h2 className="title"><Link to={`/projects/${post_name}`}>{post_title}</Link></h2>
        <p className="services">{subtitle}</p>
      </article>
    );
  }
}