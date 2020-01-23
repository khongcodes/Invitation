import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from '../actions/eventActions';
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

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    this.props.addEvent(this.state, this.pushHistory)
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

const mapStateToProps = state => ({
  event: state.event
})

const mapDispatchToProps = dispatch => ({
  addEvent: (event, callback) => dispatch(addEvent(event, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventFormContainer)