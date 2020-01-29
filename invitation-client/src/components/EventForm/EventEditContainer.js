import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleReadDate, handleReadLocation, handleStoreDate, handleStoreLocation }  from '../handleDateTimeLocation';
import { editEvent, clearEvent, updateEvent } from '../../actions/eventActions';
import EventForm from './EventForm';

class EventEditContainer extends Component {
  state = {}

  loadEventToState = (formData) => {
    // initial load into state - SHOULD depend on whether or not stored location is based on user input or not
    
    // THIS ISN'T A GREAT SOLUTION but
    // currently if we set location to an empty object, it is read as evaluating to empty object {}
    // we can't run Object.entries(location) - null can't be converted to object
    // when we try to access location.label - can't reach label property of undefined
    // when we try to evaluate boolean !!location - it evaluates to true
    // so as a temporary solution we just must give it its data in all readable locations

    if (typeof handleReadLocation(formData.location) === 'string') {
      this.setState({
        ...formData,
        date: handleReadDate(formData.date),
        location: {label: handleReadLocation(formData.location)},
        locationUserString: handleReadLocation(formData.location)
      })
    } else {
      this.setState({
        ...formData,
        date: handleReadDate(formData.date),
        location: handleReadLocation(formData.location),
        locationUserString: ''
      })
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.editEvent(id, this.loadEventToState);
  }

  componentWillUnmount() {
    this.props.clearEvent();
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  // store date in state as string
  changeDate = date => this.setState({ date })

  // store time in state as Time object
  changeTime = time => this.setState({ time })

  // support user entering their own string and not choosing a location
  // solely for controlled custom input
  changeLocationUserString = locationUserString => this.setState({ locationUserString })

  // store location in state as JavaScript object
  // this fires when the user CLICKS A SUGGESTION
  // overwrite locationUserString to empty string - not undefined because this state property is read
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

  handleSubmit = event => {
    event.preventDefault();
    const {locationUserString, date, location, ...passedState} = this.state;

    this.props.updateEvent(this.props.event.data.id, {
      ...passedState,
      user_id: this.props.sessionUser.data.id,
      date: handleStoreDate(this.state.date),
      location: handleStoreLocation(this.state.location, this.state.locationUserString)
    }, this.pushHistory)
  }

  render() {
    const status = this.props.event.status;

    if (status === 'failure') {
      return (<h2>{this.props.event.data.message}</h2>);
    } else {
      return (
        <div className='FormContainer'>
          <h2 className='Form header'>Edit your event.</h2>
            <EventForm 
              formData = {this.state}
              handleChange = {this.handleChange}
              changeLocationUserString = {this.changeLocationUserString}
              changeLocation = {this.changeLocation}
              changeDate = {this.changeDate}
              changeTime = {this.changeTime}
              handleSubmit = {this.handleSubmit}
              submitText = {'Update event'}
            />
        </div>
      );
    }
  }
}

const mapStateToProps = ({event}) => ({event});

const mapDispatchToProps = dispatch => ({
  editEvent: (id, callback) => dispatch(editEvent(id, callback)),
  updateEvent: (id, event, callback) => dispatch(updateEvent(id, event, callback)),
  clearEvent: () => dispatch(clearEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventEditContainer)