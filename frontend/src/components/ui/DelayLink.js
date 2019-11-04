import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router';
// import { TransitionContext } from '../contexts/TransitionContext';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/config';

/**
 * Wraps the React Router Link component and creates a delay after the link is clicked.
 */
const DelayLink = props => {
  const transition = document.getElementById('transition');
  const wipeAttr = 'data-wipe-side';
  let history = useHistory();
  // const { wipeSide, setWipeSide } = useContext(TransitionContext);
  const delay = config.pageTransitionTime;
  const onDelayStart = () => {
    const wipeStatus = transition.getAttribute(wipeAttr);
    transition.setAttribute(wipeAttr, -wipeStatus);
  };
  const onDelayEnd = () => { };
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