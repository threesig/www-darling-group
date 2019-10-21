import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { retrieve } from './helpers'
import config from './config/config';
import menus from './data/menus';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

retrieve(config.contentDataUri)
  .then(data => {
    ReactDOM.render(<App posts={data} menus={menus} />, document.getElementById('root'));
  });



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
