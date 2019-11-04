import React from 'react';
import debounce from 'lodash.debounce';
import { cpus } from 'os';
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
  const fullBlockTypes = ['welcome', 'intro', 'showcase'];

  const initAcc = { full: [], standard: [] };
  const catBlocks = blocks.reduce((acc, block) => {
    const cat = fullBlockTypes.includes(block.acf_fc_layout) ? 'full' : 'standard';
    return acc;
  }, initAcc)

  return catBlocks;
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


export { slugify, retrieve, categorizeBlocks, prepFullBlocks, getMainScrollY, getMetaTags }

