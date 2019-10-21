import React from 'react';
import Image from './Image';

export default class Gallery extends React.Component {
  static defaultProps = {
    scaleOnHover: true
  }
  getImageKey = (imgId, idx) => `${idx}-img-${imgId}`;
  renderGallery = imgsData => imgsData ? <ul className={this.getClassNames()} >{imgsData.map(this.renderGalleryItem)}</ul> : null;
  renderGalleryItem = (imgData, idx) => <li key={this.getImageKey(imgData.id, idx)} className="item-gallery"><Image data={imgData} scaleOnHover={this.props.scaleOnHover} /></li>;
  getClassNames = () => {
    const classes = ['Gallery'];
    return classes.join(' ');
  }
  render() {
    const { gallery } = this.props.data;
    return this.renderGallery(gallery);
  }
}