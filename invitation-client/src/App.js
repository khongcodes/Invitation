import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout, loginStatus } from './actions/sessionActions'

import MenuContainer from './components/Menu/MenuContainer';
import EventCreateContainer from './components/EventForm/EventCreateContainer';
import EventPageContainer from './components/EventPage/EventPageContainer';
import EventEditContainer from './components/EventForm/EventEditContainer';
import CreateUserContainer from './components/CreateUserPage/CreateUserContainer';
import ShowUserContainer from './components/UserPage/ShowUserContainer';
import EditUserContainer from './components/UserPage/EditUserContainer';
import MapContainer from './components/MapContainer/MapContainer';

import './style/App.css';


class App extends Component {
  componentDidMount() {
    this.props.loginStatus()
  }

  render() {
    const userIsLoaded = Object.entries(this.props.session.data).length === 0;

    return (
      <Router>
        <MenuContainer sessionUser={this.props.session} login={this.props.login} logout={this.props.logout}/>

        <div className='App body-container'>

          <div className='App section left'>
            <Route exact path='/event/:id' component={MapContainer}/>
          </div>

          <div className='App center'>
            <Route exact path='/'>
              <Redirect to='/create'/>
            </Route>

            <Route path='/create' render={routerProps => <EventCreateContainer {...routerProps} sessionUser={this.props.session}/>} />
            <Route exact path='/event/:id' component={EventPageContainer} />
            <Route exact path='/event/:id/edit' render={routerProps => <EventEditContainer {...routerProps} sessionUser={this.props.session} />} />
            
            {/* prevent user/create from routing user/id */}
            <Switch>

              {/* redirect user away from create user if they are logged in */}
              <Route path='/user/create'>
                {userIsLoaded ? <CreateUserContainer /> : <Redirect to='/create' />}
              </Route>
              
              <Route path='/user/:id/edit' component={EditUserContainer} />
              <Route path='/user/:id' component={ShowUserContainer} />
              
              
            </Switch>
          </div>

          <div className='App section right'>
            <Route exact path='/event/:id' render={routerProps => <div>{this.props.session.data.name}</div>}/>
          </div>
          
        </div>
      </Router>
    )
  }
}

const mapStateToProps = ({session}) => ({session})

const mapDispatchToProps = dispatch => ({
  login: userParams => dispatch(login(userParams)),
  logout: () => dispatch(logout()),
  loginStatus: () => dispatch(loginStatus())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
