import React from 'react';
import Image from '../ui/Image';
import Content from '../ui/Content';
import Gallery from '../ui/Gallery';
import WipeLink from '../ui/WipeLink';
import BlockNext from '../ui/BlockNext';

export default {
  welcome(data) {
    const { title, content } = data;
    const getTitle = title => title ? <h1 className="title" dangerouslySetInnerHTML={{ __html: title }} /> : null;
    const getContent = content => content ? <Content markup={content} /> : null;

    return (
      <div className="content-area">
        {getTitle(title)}
        {getContent(content)}
      </div>
    )
  },
  intro(data) {
    // TODO ~~~ Get background color to match image
    const { title, content, image, link, linkText } = data;
    return (
      <>
        <BlockNext theme="welcome" />
        <div className="cell">
          {image ? <Image data={image} /> : null}
        </div>
        <div className="cell">
          {title ? <h1 className="title"><Content markup={title} /></h1> : null}
          {content ? <Content markup={content} /> : null}
          {link && linkText ? <WipeLink className="go" to={link}>{linkText}</WipeLink> : null}
        </div>
        <BlockNext />
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
          <div className="titles">
            {titles ? titles.map(renderTitle) : null}
          </div>
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
  jumbotron(data) {
    const { title, content, image, imagePosition, slug } = data;
    return (
      <>
        <WipeLink className="outer" to={`/projects/${slug}`}>
          <div className="inner">
            <Image data={image} bgpos={imagePosition} />
            <div className="content-area">
              <h2 className="title">{title}</h2>
              <Content markup={content} />
              <span className="go" to={`/projects/${slug}`}>View Case Study</span>
            </div>
          </div>
        </WipeLink>
        <BlockNext />
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
      <div className="content-area">
        <h3 className="title">Get In Touch</h3>
        <a className="go" href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </div>
    )
  },
}