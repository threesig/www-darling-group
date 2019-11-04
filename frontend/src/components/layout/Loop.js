import React from 'react';
import Page from './Page';
import Archive from './Archive';
import DefaultPage from './Pages/DefaultPage';
import ErrorPage from './Pages/ErrorPage';


const Loop = props => {
  const {query} = props || [];
  
  const getLoopTemplate = () => {
    switch (query.length) {
      case 1:
        return <DefaultPage query={query} location={props.location} />
      default:
          return <ErrorPage />;
    }
  }
  return getLoopTemplate();
}

export default Loop;