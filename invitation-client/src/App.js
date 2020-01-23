import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EventFormContainer from './components/EventFormContainer';
import EventPage from './components/EventPage';

import './style/App.css';

function App() {
  return (
    <div className='App body-container'>
      <Router>
        <Route exact path='/' component={EventFormContainer} />
        <Route path='/event/:id' render={routerProps => <EventPage {...routerProps}/> }/>
      </Router>
    </div>
  );
}

export default App;
