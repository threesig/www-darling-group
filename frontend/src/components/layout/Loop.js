import React from 'react';
import PageF from './PageF';
import Archive from './Archive';
import DefaultPageF from './Pages/DefaultPageF';


const Loop = props => {
  const {query} = props || [];
  
  const getLoopTemplate = () => {
    switch (query.length) {
      case 1:
        return <DefaultPageF query={query} />
      default:
          return <p>404!</p>;
    }
  }
  return (
    <PageF>
      {getLoopTemplate()}
    </PageF>
  );
}

export default Loop;