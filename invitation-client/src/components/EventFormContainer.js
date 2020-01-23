import React, { Component } from 'react';

import EventForm from './EventForm';
import '../style/EventForm.css'

class EventFormContainer extends Component {
  state = {
    title: "",
    description: "",
    location: "",
    date: "",
    time: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    // submit event to database
    // link into event route
  }
  
  render() {
    return (
      <div className='EventFormContainer'>
        <h2 className='EventForm header'>Create an event.</h2>
          <EventForm 
            formData = {this.state}
            handleChange = {this.handleChange}
            handleSubmit = {this.handleSubmit}
          />
      </div>
    )
  }
}

export default EventFormContainer