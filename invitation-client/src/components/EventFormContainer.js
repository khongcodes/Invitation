import React, { Component } from 'react';

import EventForm from './EventForm';

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
  }
  
  render() {
    return (
      <>
        <h2>Create an event.</h2>
        <EventForm 
          formData = {this.state}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
      </>
    )
  }
}

export default EventFormContainer