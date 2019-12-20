import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import {setFullheight} from '../helpers';
import config from '../config/config';


import Homepage from './layout/Pages/Homepage';
import Archive from './layout/Archive';
import { groupBy } from 'lodash';
import Loop from './layout/Loop';
import ProjectSingle from './layout/Pages/ProjectSingle';

import { FullBlocksContext } from './contexts/FullBlocksContext';
import { TransitionContext } from './contexts/TransitionContext';


const App = props => {

  const [pageHasScroll, setPageHasScroll] = useState(true);
  const [wipeSide, setWipeSide] = useState(-1);


  const sorted_posts = props.posts.sort((a, b) => (a.menu_order > b.menu_order) ? 1 : -1);
  const posts = groupBy(sorted_posts, post => post.post_type);

  const RouterGuts = withRouter(({ location }) => (
    <Switch location={location}>
      <Route exact path="/" render={props => <Homepage {...props} pageKey={'home'} query={posts.page.filter(page => page.post_name === 'home')} featured={posts.casestudy.filter(casestudy => casestudy.isFeatured)} />} />
      <Route path="/work" render={props => <Archive {...props} query={posts.casestudy} />} />
      <Route path="/projects/:slug" render={props => <ProjectSingle pageKey={props.match.params.slug} {...props} query={getSingleQuery('casestudy', props.match.params.slug)} next={getNextSlug('casestudy', props.match.params.slug)} />} />
      <Route path="/:slug" render={props => <Loop {...props} query={posts.page.filter(page => page.post_name === props.match.params.slug)} />} />
    </Switch>
  ));

  const getSingleQuery = (postType, slug) => posts[postType].filter(postType => postType.post_name === slug)
  const getNextSlug = (postType, slug) => {

    // Grab the post type to search
    const postGroup = posts[postType];

    // Find the array index of the post that contains the slug
    const myIdx = postGroup.findIndex(post => post.post_name === slug)

    // Increment the array index, modulo on length of post array
    const nextIdx = (myIdx + 1) % postGroup.length;

    // Grab slug of the post at the new array index
    const nextSlug = postGroup[nextIdx].post_name;



    return nextSlug;
  }




  useEffect(() => {
    window.addEventListener('resize', setFullheight);
    setFullheight();
    
    return () => {
      
    }
  });






  return (
    <TransitionContext.Provider value={{ wipeSide, setWipeSide }}>
      <FullBlocksContext.Provider value={{ pageHasScroll, setPageHasScroll }}>
        <div id="App">
          <Router>
            <RouterGuts />
          </Router>
        </div>
      </FullBlocksContext.Provider>
    </TransitionContext.Provider>
  );
}

export default App;