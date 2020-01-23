import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import EventFormContainer from './components/EventFormContainer';
import EventPage from './components/EventPage';

import './style/App.css';

function App() {
  return (
    <div className='App body-container'>
      <Router>
        <Route exact path='/'>
          <Redirect to='/create'/>
        </Route>
        <Route exact path='/create' component={EventFormContainer} />
        <Route exact path='/event/:id' component={EventPage} />
      </Router>
    </div>
  );
}

export default App;
