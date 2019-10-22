import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.style.scss';

import MainNavigation from './layout/MainNavigation';
import Header from './layout/Header';
import Footer from './layout/Footer';

// import Page from './layout/Page';
import PageF from './layout/PageF';
import HomepageF from './layout/Pages/HomepageF';
import ServicesPageF from './layout/Pages/ServicesPageF';
import Archive from './layout/Archive';

import menus from '../data/menus';
import { groupBy } from 'lodash';
import Loop from './layout/Loop';
import ProjectSingleF from './layout/Pages/ProjectSingleF';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const sorted_posts = props.posts.sort((a, b) => (a.menu_order > b.menu_order) ? 1 : -1);
    this.posts = groupBy(sorted_posts, post => post.post_type);
  }
  getSingleQuery = (postType, slug) => this.posts[postType].filter(postType => postType.post_name === slug)
  getNextSlug = (postType, slug) => {

    // Grab the post type to search
    const postGroup = this.posts[postType];

    // Find the array index of the post that contains the slug
    const myIdx = postGroup.findIndex(post => post.post_name === slug)

    // Increment the array index, modulo on length of post array
    const nextIdx = (myIdx + 1) % postGroup.length;

    // Grab slug of the post at the new array index
    const nextSlug = postGroup[nextIdx].post_name;

    return nextSlug;
  }
  render() {
    this.getNextSlug('casestudy', 'stok-cold-brew')
    return (
      <div id="App">
        <Router>
          <Header menuData={menus.main} />
          <div id="wrap">
            <MainNavigation menuData={menus.main} />
            <div id="page-area">
              <Switch>
                <Route exact path="/" render={props => <HomepageF {...props} pageKey={'home'} query={this.posts.page.filter(page => page.post_name === 'home')} featured={this.posts.casestudy.filter(casestudy => casestudy.isFeatured)} />} />
                <Route path="/work" render={props => <Archive {...props} query={this.posts.casestudy} />} />
                <Route path="/projects/:slug" render={props => <ProjectSingleF pageKey={props.match.params.slug} {...props} query={this.getSingleQuery('casestudy', props.match.params.slug)} next={this.getNextSlug('casestudy', props.match.params.slug)} />} />
                <Route path="/:slug" render={props => <Loop {...props} query={this.posts.page.filter(page => page.post_name === props.match.params.slug)} />} />
              </Switch>
              <Footer menuData={menus} />
            </div>
          </div>
        </Router>
      </div>

    );
  }
}