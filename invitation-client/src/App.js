import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout, loginStatus } from './actions/userActions'

import MenuContainer from './components/Menu/MenuContainer';
import EventFormContainer from './components/EventForm/EventFormContainer';
import EventPageContainer from './components/EventPage/EventPageContainer';
import CreateUserContainer from './components/CreateUserPage/CreateUserContainer';
import ShowUserContainer from './components/ShowUserPage/ShowUserContainer';

import './style/App.css';

class App extends Component {
  componentDidMount() {
    this.props.loginStatus()
  }

  render() {
    return (
      <div className='App body-container'>
        <Router>
          <MenuContainer user={this.props.user.data}/>

          <Route exact path='/'>
            <Redirect to='/create'/>
          </Route>

          <Route path='/create' component={EventFormContainer} />
          <Route path='/event/:id' component={EventPageContainer} />
          
          <Switch>
            <Route path='/user/create' component={CreateUserContainer} />
            <Route path='/user/:id' component={ShowUserContainer} />
          </Switch>
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
