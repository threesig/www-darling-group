import React from 'react';
import { slugify } from '../../helpers';
import DelayLink from '../ui/DelayLink';
const Menu = props => {

  const { items } = props || {};

  const getLinkTemplate = (itemText, itemDestination) => {
    return itemDestination.includes(':') ? <a href={itemDestination}>{itemText}</a> : <DelayLink to={itemDestination}>{itemText}</DelayLink>;
  }
  const getMenuItem = (itemText, itemDestination) => {
    const itemSlug = slugify(itemText);
    return <li key={itemSlug} className="menu-item">{getLinkTemplate(itemText, itemDestination)}</li>;
  }
  return (
    <ul className="menu">
      {Object.keys(items).map(itemKey => getMenuItem(itemKey, items[itemKey]))}
    </ul>
  );
}
export default Menu;