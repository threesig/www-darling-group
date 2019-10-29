import debounce from 'lodash.debounce';
import { cpus } from 'os';

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

const compileBlocks = function() {
  let allBlocks = [];
  
  // Compile the blocks
  for (const arg of arguments) {
    allBlocks = [...allBlocks, ...(arg.constructor===Array?arg:[arg])];
  }

  // Prep the blocks
  const activeClass = 'active';
  let {classNames} = allBlocks[0];

  const initBlockCustomClasses = classNames?classNames.split(' '):[];
  if(!initBlockCustomClasses.includes(activeClass)) {
    initBlockCustomClasses.push(activeClass);
  }
  allBlocks[0].classNames = initBlockCustomClasses.join(' ');


  return allBlocks;


}

export { slugify, retrieve, compileBlocks }

