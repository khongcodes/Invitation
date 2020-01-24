import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios'

import { login, logout, loginStatus } from './actions/userActions'

import MenuContainer from './components/Menu/MenuContainer';
import EventFormContainer from './components/EventForm/EventFormContainer';
import EventPageContainer from './components/EventPage/EventPageContainer';

import './style/App.css';

class App extends Component {
  render() {
    return (
      <div className='App body-container'>
        <button onClick={this.props.loginStatus}/>
        <Router>
          <MenuContainer />
          <Route exact path='/'>
            <Redirect to='/create'/>
          </Route>
          <Route exact path='/create' component={EventFormContainer} />
          <Route exact path='/event/:id' component={EventPageContainer} />
        </Router>
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  logout: () => dispatch(logout()),
  loginStatus: () => dispatch(loginStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
