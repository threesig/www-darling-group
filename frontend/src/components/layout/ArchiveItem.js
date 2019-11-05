import React from 'react';
import Image from '../ui/Image';
import WipeLink from '../ui/WipeLink';

const ArchiveItem = props => {
  const { ID, post_title, subtitle, showcaseImage, secondaryImage, post_name, post_type } = props.post;
  const getClassNames = () => {
    return [
      'ArchiveItem',
      'post',
      `type-${post_type}`
    ].join(' ');
  }

  return (
    <article id={`post-${ID}`} className={getClassNames()}>
      <Image data={secondaryImage || showcaseImage} scaleOnHover={true} />
      <div className="content-area">
        <h2 className="title"><WipeLink to={`/projects/${post_name}`}>{post_title}</WipeLink></h2>
        <p className="content">{subtitle}</p>
      </div>
    </article>
  );
}

export default ArchiveItem;