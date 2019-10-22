import React from 'react';
import Page from './Page';
import Archive from './Archive';
import DefaultPage from './Pages/DefaultPage';


const Loop = props => {
  const {query} = props || [];
  
  const getLoopTemplate = () => {
    switch (query.length) {
      case 1:
        return <DefaultPage query={query} />
      default:
          return <p>404!</p>;
    }
  }
  return (
    <Page>
      {getLoopTemplate()}
    </Page>
  );
}

export default Loop;