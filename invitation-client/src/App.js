import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import EventFormContainer from './components/EventFormContainer';
import './style/App.css';

function App() {
  return (
    <Router>
      <Route exact path='/' component = {EventFormContainer} />
    </Router>
  );
}

export default App;
