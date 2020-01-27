import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from '../../actions/eventActions';
import { handleStoreDate, handleReadDate, handleStoreLocation, handleReadLocation } from '../handleDateTime';
import EventForm from './EventForm';
import '../../style/EventForm.css'

// controlled form
class EventFormContainer extends Component {
  state = {
    title: "",
    description: "",
    location: "",
    date: new Date(),
    time: '10:00'
  }

  handleChange = event => 
    this.setState({
      [event.target.name]: event.target.value
    })

  // store date in state as string
  changeDate = date => this.setState({ date })

  // store time in state as Time object
  changeTime = time => this.setState({ time })

  // store location in state as JavaScript object
  changeLocation = locationData => {
    this.setState({
      location: {
        label: locationData.label,
        location: locationData.location
      }
    })
  }

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  // submit, along with current user id
  // process time and location into strings for storage
  handleSubmit = event => {
    event.preventDefault();
    this.props.addEvent({
      ...this.state,
      user_id: this.props.sessionUser.data.id,
      date: handleStoreDate(this.state.date),
      location: handleStoreLocation(this.state.location)
    }, this.pushHistory)
  }
  
  render() {
    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Create an event.</h2>
          <EventForm 
            formData = {this.state}
            handleChange = {this.handleChange}
            changeLocation = {this.changeLocation}
            changeDate = {this.changeDate}
            changeTime = {this.changeTime}
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