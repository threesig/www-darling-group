import React from 'react';
import { slugify } from '../../helpers';
import { Link } from "react-router-dom";
const Menu = props => {
  
  const {items} = props || {};

  const getLinkTemplate = (itemText, itemDestination) => {
    return itemDestination.includes(':')? <a href={itemDestination}>{itemText}</a>: <Link to={itemDestination}>{itemText}</Link>;
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