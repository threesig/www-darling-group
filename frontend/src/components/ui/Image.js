import React from 'react';
export default class Image extends React.Component {
  constructor(props) {
    super(props);
    const { size, data, width, height, id } = props;
    this.img = {
      alt: data.alt,
      id: `img-${id}`,
      bgpos: '50%'
    }

    this.img['src'] = size ? data.sizes[size] : data.url;

    // First attempt to assign manual dimensions.  If no manual dimensions provided, then determine dimension from image size
    this.img['width'] = width ? width :
      size ? data.sizes[`${size}-width`] : data.width;
    this.img['height'] = height ? height :
      size ? data.sizes[`${size}-height`] : data.height;
  }
  static defaultProps = {
    scaleOnHover: false
  }
  getClassNames = () => {
    const { scaleOnHover } = this.props;
    const classes = ['img'];
    if (scaleOnHover) {
      classes.push('scale-on-hover');
    }
    return classes.join(' ');
  }
  getStyle = () => {
    return { backgroundImage: `url(${this.img.src})`, backgroundPosition: `${this.props.bgpos} 50%` };
  };
  render() {
    // option to scale up on hover
    // img container is overflow hiddne
    // image url on interior background
    // set image to scale, vh
    // if scale on hover, scle up interior
    const { alt, src, width, height, id } = this.img;
    return (
      <>
        <div className={this.getClassNames()}>
          <div className="inner" style={this.getStyle()}>
            <img id={id} src={src} alt={alt} width={width} height={height} />
          </div>
        </div>
      </>
    );
  }
}