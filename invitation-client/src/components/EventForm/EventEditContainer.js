import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadDate, handleReadLocation, handleStoreDate, handleStoreLocation }  from '../handleDateTimeLocation';
import { editEvent, clearEvent, updateEvent } from '../../actions/eventActions';
import EventForm from './EventForm';

class EventEditContainer extends Component {
  state = {}

  loadEventToState = (formData) => {
    this.setState({
      ...formData,
      location: handleReadLocation(formData.location),
      date: handleReadDate(formData.date)
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.editEvent(id, this.loadEventToState);
  }

  componentWillUnmount() {
    this.props.clearEvent();
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
  // this fires when the user CLICKS A SUGGESTION
  changeLocation = locationData => {
    if (locationData) {
      this.setState({
        location: {
          label: locationData.label,
          location: locationData.location
        }
      })
    }
  }

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  render() {
    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Edit your event.</h2>
          <EventForm 
            formData = {this.state}
            handleChange = {this.handleChange}
            changeLocation = {this.changeLocation}
            changeDate = {this.changeDate}
            changeTime = {this.changeTime}
            handleSubmit = {this.handleSubmit}
            submitText = {'Update event'}
          />
      </div>
    )
  }
}

const mapStateToProps = ({event}) => ({event});

const mapDispatchToProps = dispatch => ({
  editEvent: (id, callback) => dispatch(editEvent(id, callback)),
  updateEvent: (event, callback) => dispatch(updateEvent()),
  clearEvent: () => dispatch(clearEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventEditContainer)