import React from 'react';
import { slugify } from '../../helpers';
import { Link } from "react-router-dom";
export default class Menu extends React.Component {
  static defaultProperties = {
    items: []
  }
  getMenuItem(itemText) {
    const itemSlug = slugify(itemText);
    return <li key={itemSlug} className="menu-item"><Link key={itemSlug} to={`/${itemSlug}`}>{itemText}</Link></li>;
  }
  render() {
    return (
      <ul className="menu">
        {this.props.items.map(this.getMenuItem)}
      </ul>
    );
  }
}