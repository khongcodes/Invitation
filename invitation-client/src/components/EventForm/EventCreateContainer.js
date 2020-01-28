import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from '../../actions/eventActions';
import { handleStoreDate, handleStoreLocation } from '../handleDateTimeLocation';
import EventForm from './EventForm';
import '../../style/EventForm.css'

// controlled form
class EventCreateContainer extends Component {
  state = {
    title: "",
    description: "",
    locationUserString: "",
    location: {},
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

  // support user entering their own string and not choosing a location
  // solely for controlled custom input
  changeLocationUserString = locationUserString => this.setState({ locationUserString })

  // store location data in state as JavaScript object
  // fires on user CHOOSING A GEOSUGGEST SUGGEST ITEM
  // sets locationUserString to empty string
  changeLocation = locationData => {
    if (locationData) {
      this.setState({
        location: {
          label: locationData.label,
          location: locationData.location
        },
        locationUserString: ''
      })
    }
  }

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  // submit, along with current user id
  // process time and location into strings for storage
  handleSubmit = event => {
    event.preventDefault();
    const {locationUserString, date, location, ...passedState} = this.state;

    this.props.addEvent({
      ...passedState,
      user_id: this.props.sessionUser.data.id,
      date: handleStoreDate(this.state.date),
      location: handleStoreLocation(this.state.location, this.state.locationUserString)
    }, this.pushHistory)
  }
  
  render() {
    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Create an event.</h2>
          <EventForm 
            formData = {this.state}
            handleChange = {this.handleChange}
            changeLocationUserString = {this.changeLocationUserString}
            changeLocation = {this.changeLocation}
            changeDate = {this.changeDate}
            changeTime = {this.changeTime}
            handleSubmit = {this.handleSubmit}
            submitText = {'Create event'}
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

export default connect(mapStateToProps, mapDispatchToProps)(EventCreateContainer)