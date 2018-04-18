import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from './Main';
import history from '../history';

export default class Routes extends Component {
  render () {
    return (
      <Router history={history}>
        <Route path="/" component={Main} />
      </Router>
    )
  }
}