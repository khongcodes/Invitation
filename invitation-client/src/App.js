import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout } from './actions/userActions'

import MenuContainer from './components/Menu/MenuContainer';
import EventFormContainer from './components/EventForm/EventFormContainer';
import EventPageContainer from './components/EventPage/EventPageContainer';

import './style/App.css';

class App extends Component {
  componentDidMount() {
    if (localStorage.jwt !== undefined) {
      
    }
  }

  render() {
    return (
      <div className='App body-container'>
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
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
