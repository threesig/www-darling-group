import React from 'react';
import Image from '../ui/Image';
import Content from '../ui/Content';
import Gallery from '../ui/Gallery';
import { Link } from 'react-router-dom';

export default {
  welcome(data) {
    const { title, content } = data;
    const getTitle = title => title ? <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} /> : null;
    const getContent = content => content ? <Content markup={content} /> : null;

    return (
      <>
        {getTitle(title)}
        {getContent(content)}
        <a className="next">Next</a>
      </>
    )
  },
  intro(data) {
    // TODO ~~~ Add link
    // TODO ~~~ Get background color to match image
    const { title, content, image } = data;
    return (
      <>
        <div className="cell">
          {image ? <Image data={image} /> : null}
        </div>
        <div className="cell">
          {title ? <h1 className="title">{title}</h1> : null}
          {content ? <Content markup={content} /> : null}
          {/* Link goes here */}
        </div>
        <a className="next">Next</a>
      </>
    )
  },
  general(data) {
    const getRepeaterKey = (blockType, idx) => `${data.blockIdx}-${blockType}-${idx}`;
    const renderTitle = (titleItem, idx) => <h3 key={getRepeaterKey('title', idx)} className="title">{titleItem.title}</h3>;
    const renderContentItem = (contentItem, idx) => <li key={getRepeaterKey('content', idx)} className="item-content"><div className="content" dangerouslySetInnerHTML={{ __html: contentItem.content }} /></li>;
    const { titles, contents } = data;
    return (
      <>
        <div className="cell">
          {titles ? titles.map(renderTitle) : null}
        </div>
        <div className="cell">
          <ul className="list-contents" data-elts={contents.length}>
            {contents ? contents.map(renderContentItem) : null}
          </ul>
        </div>
      </>
    )
  },
  image(data) {
    const { image } = data;
    return image ? <Image data={image} /> : null;
  },
  logos(data) {
    return <Gallery data={data} scaleOnHover={false} />
  },
  gallery(data) {
    return <Gallery data={data} />
  },
  showcase(data) {
    const { title, content, image, slug } = data;
    return (
      <>
        <Image data={image} />
        <div className="content-area">
          <h2 className="title">{title}</h2>
          <Content markup={content} />
          <Link to={`/projects/${slug}`}>View Case Study</Link>
        </div>
      </>
    )
  },
  blockquote(data) {
    const { quotation, citation } = data;
    return (
      <>
        <blockquote dangerouslySetInnerHTML={{ __html: quotation }} />
        <cite>{citation}</cite>
      </>
    )
  },
  contact() {
    const contactEmail = 'hello@darlingbedifferent.com';
    return (
      <>
        <h3 className="title">Get In Touch</h3>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </>
    )
  },
}