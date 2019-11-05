import React from 'react';
import { slugify } from '../../helpers';
import WipeLink from '../ui/WipeLink';
const Menu = props => {

  const { items } = props || {};

  const getLinkTemplate = (itemText, itemDestination) => {
    return itemDestination.includes(':') ? <a href={itemDestination}>{itemText}</a> : <WipeLink linktype="nav" to={itemDestination}>{itemText}</WipeLink>;
  }
  const getMenuItem = (itemText, itemDestination) => {
    const itemSlug = slugify(itemText);
    return <li key={itemSlug} className="menu-item">{getLinkTemplate(itemText, itemDestination)}</li>;
  }
  return (
    <ul className="Menu">
      {Object.keys(items).map(itemKey => getMenuItem(itemKey, items[itemKey]))}
    </ul>
  );
}
export default Menu;