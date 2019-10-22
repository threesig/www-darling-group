import React from 'react';
import Block from '../Block';
import Page from '../Page';
import Contact from '../Contact';

const ErrorPage = props => {
  return (
    <Page>
      <div className="block error-page color-scheme-light">
        <div className="interior">
          <h1>Page not found</h1>
        </div>
      </div>
    </Page>
  )
}

export default ErrorPage