import React from 'react';
import templates from './Block.templates';

const Block = props => {
  const { data } = props;

  const colorKey = 'colorScheme';
  let colorScheme = null;
  if (data.hasOwnProperty(colorKey)) {
    colorScheme = data[colorKey];
  }
  else if (props.hasOwnProperty(colorKey)) {
    colorScheme = props[colorKey];
  }
  else {
    colorScheme = 'light'
  }

  const getClassNames = () => {
    const classes = ['block', data.acf_fc_layout, `color-scheme-${colorScheme}`];

    const { classNames } = data;
    if (classNames) {
      classes.push(classNames);
    }

    if (data.type) {
      classes.push(`type-${data.type}`);
    }
    return classes.join(' ');
  }
  const getTemplate = data => {
    const template = templates[data.acf_fc_layout];
    return template ? template(data) : <p>There is no block type called `{data.acf_fc_layout}`!</p>;
  };
  const getCustomContent = () => null;

  return (
    <section className={getClassNames()}>
      <div className="block-wrap">
        <div className="interior">
          {data ? getTemplate(data) : getCustomContent()}
        </div>
      </div>
    </section>
  );
}

export default Block;