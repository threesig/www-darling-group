import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

/**
 * Wraps the React Router Link component and creates a delay after the link is clicked.
 */
const DelayLink = props => {
  let history = useHistory();

  const delay = 1000;
  const onDelayStart = () => {
    console.log('delay start!');
  };
  const onDelayEnd = () => {
    console.log('delay end!');
  };
  let timeout = null;


  useEffect(() => {
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, []);

  /**
   * Called when the link is clicked
   *
   * @param {Event} e
   */
  const handleClick = (e) => {
    const { replace, to } = props;

    onDelayStart(e, to);
    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();

    timeout = setTimeout(() => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
      onDelayEnd(e, to);
    }, delay);
  };

  return <Link {...props} onClick={handleClick} />;
}
export default DelayLink;