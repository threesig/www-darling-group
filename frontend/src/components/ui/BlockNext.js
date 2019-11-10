import React from 'react';
const BlockNext = props => {
  let { theme } = props;
  theme = theme || 'default';
  const getClassNames = () => {
    return [
      'BlockNext',
      theme,
    ].join(' ');
  }
  return (
    <a className={getClassNames()}><span>Next</span></a>
  );
}

export default BlockNext;