import React from 'react';
import Page from '../Page';
import Contact from '../Contact';

export default class ServicesPage extends Page {
  hookAfterContentBlocks = () => {
    return <Contact />;
  };
}