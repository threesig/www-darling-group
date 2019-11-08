import React from 'react';
import Image from '../ui/Image';
import WipeLink from '../ui/WipeLink';

const ArchiveItem = props => {
  const { ID, post_title, casestudySubtitle, workIndexImage, casestudyImage, post_name, post_type } = props.post;
  const getClassNames = () => {
    return [
      'ArchiveItem',
      'post',
      `type-${post_type}`
    ].join(' ');
  }
  return (
    <article id={`post-${ID}`} className={getClassNames()}>
      <WipeLink className="outer" to={`/projects/${post_name}`}>
        <Image data={workIndexImage || casestudyImage} scaleOnHover={false} />
        <div className="content-area">
          <h2 className="title">{post_title}</h2>
          <p className="content">{casestudySubtitle}</p>
        </div>
      </WipeLink>
    </article>
  );
}

export default ArchiveItem;