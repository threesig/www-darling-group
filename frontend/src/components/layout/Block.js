import React from 'react';
import templates from './Block.templates';

export default class Block extends React.Component {
  static defaultProps = {
    colorScheme: 'light'
  }
  getClassNames = () => {
    const { data } = this.props;
    const colorScheme = data.colorScheme ? data.colorScheme : this.props.colorScheme;
    const classes = ['block', data.acf_fc_layout, `color-scheme-${colorScheme}`];

    if (data.type) {
      classes.push(`type-${data.type}`);
    }
    return classes.join(' ');
  }
  getTemplate = data => {
    const template = templates[data.acf_fc_layout];
    return template ? template(data) : <p>There is no block type called `{data.acf_fc_layout}`!</p>;
  };
  getCustomContent = () => null;
  render() {
    const { data } = this.props;

    return (
      <section className={this.getClassNames()}>
        <div className="interior">
          {data ? this.getTemplate(data) : this.getCustomContent()}
        </div>
      </section>
    );
  }
}