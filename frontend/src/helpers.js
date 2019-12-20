import React from 'react';
import { Helmet } from 'react-helmet';
import allMeta from './data/meta';

const getRootUrl = () => {
  var defaultPorts = { "http:": 80, "https:": 443 };

  return window.location.protocol + "//" + window.location.hostname
    + (((window.location.port)
      && (window.location.port != defaultPorts[window.location.protocol]))
      ? (":" + window.location.port) : "");
}
const slugify = str => {
  str = str.replace(/^\s+|\s+$/g, '');

  // Make the string lowercase
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
  var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  // Remove invalid chars
  str = str.replace(/[^a-z0-9 -]/g, '')
    // Collapse whitespace and replace by -
    .replace(/\s+/g, '-')
    // Collapse dashes
    .replace(/-+/g, '-');

  return str;
}


async function retrieve(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

const categorizeBlocks = blocks => {
  const fullBlockTypes = ['welcome', 'intro', 'jumbotron'];

  const initAcc = { full: [], standard: [] };
  const catBlocks = blocks.reduce((acc, block) => {
    const cat = fullBlockTypes.includes(block.acf_fc_layout) ? 'full' : 'standard';
    acc[cat].push(block);
    return acc;
  }, initAcc)
  return catBlocks;
}
const extractColorScheme = classlist => {
  const colorSchemeRoot = 'color-scheme-';
  const colorSchemeContainer = [...classlist].filter(className => className.includes(colorSchemeRoot));
  const colorScheme = colorSchemeContainer.length ? colorSchemeContainer[0].substring(colorSchemeRoot.length) : null;
  return colorScheme;
}

const prepFullBlocks = function () {
  let allBlocks = [];

  // Compile the blocks
  for (const arg of arguments) {
    allBlocks = [...allBlocks, ...(arg.constructor === Array ? arg : [arg])];
  }

  // Prep the blocks
  const activeClass = 'active';
  let { classNames } = allBlocks[0];

  const initBlockCustomClasses = classNames ? classNames.split(' ') : [];
  if (!initBlockCustomClasses.includes(activeClass)) {
    initBlockCustomClasses.push(activeClass);
  }
  allBlocks[0].classNames = initBlockCustomClasses.join(' ');


  return allBlocks;


}

const getMainScrollY = () => {
  return document.getElementById('main').scrollTop;
}
const isFullScreen = el => el.offsetHeight >= window.innerHeight;

const getMetaTags = urlPath => {

  const { title, description, ogTitle, ogDescription, ogImage } = allMeta[urlPath];
  const thisUrl = `${getRootUrl()}${urlPath}`;

  return (
    <Helmet>
      {title ? <title>{title}</title> : null}
      {description ? <meta name="description" content={description} /> : null}
      {ogTitle ? <meta name="og:title" content={ogTitle} /> : null}
      {ogDescription ? <meta name="og:description" content={ogDescription} /> : null}
      {ogImage ? <meta name="og:image" content={ogTitle} /> : null}
      <meta name="og:url" content={thisUrl} />
      <link rel="canonical" href={thisUrl} />
    </Helmet>
  )
}

function swipeDetect(el, callback){
  let touchstartY = 0;
  let touchendY = 0;
  
  el.addEventListener('touchstart', e => touchstartY = e.changedTouches[0].screenY, false);
  
  el.addEventListener('touchend', e => {
    touchendY = e.changedTouches[0].screenY;
    handleGesture();
  }, false); 
  
  const handleGesture = () => {
    let dir = null;
    switch (true) {
      case touchendY <= touchstartY:
        dir = 'up';
        break;
      case touchendY >= touchstartY:
        dir = 'down';
      default:
        // do nothing
    }
    callback(dir);
  }

}

const setFullheight = () => {
  // const els = document.querySelectorAll('.full-height');
  // const winHeight = screen.availHeight;
  // els.forEach(el => {
  //   el.setAttribute('style', `height: ${winHeight}px`);
  // });



  // document.body.style.height = `${window.innerHeight}px`;
}

function getViewportSize(){
	var test = document.createElement( "div" );

	test.style.cssText = "position: fixed;top: 0;left: 0;bottom: 0;right: 0;";
	document.documentElement.insertBefore( test, document.documentElement.firstChild );
	
	var dims = { width: test.offsetWidth, height: test.offsetHeight };
	document.documentElement.removeChild( test );
	
	return dims;
}

export { slugify, retrieve, categorizeBlocks, isFullScreen, extractColorScheme, prepFullBlocks, getMainScrollY, getMetaTags, swipeDetect, setFullheight }
