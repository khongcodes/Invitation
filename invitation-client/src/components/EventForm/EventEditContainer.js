import React, { Component } from 'react';
import { connect } from 'react-redux';

import { editEvent, clearEvent, updateEvent } from '../../actions/eventActions';
import EventForm from './EventForm';

class EventEditContainer extends Component {
  state = {}

  loadEventToState = (formData) => {
    this.setState(formData)
  }

  componentDidMount() {
    const id = this.props.history.location.pathname.split('/')[2];
    this.props.editEvent(id, this.loadEventToState);
    // console.log(this.props.event.data)
  }

  componentWillUnmount() {
    // this.props.clearEvent();
  }

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  render() {
    const formData = this.props.event.data;

    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Edit your event.</h2>
          <EventForm 
            formData = {formData}
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

const mapStateToProps = ({event}) => ({event});

const mapDispatchToProps = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  clearEvent: () => dispatch(clearEvent()),
  updateEvent: (event, callback) => dispatch(updateEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventEditContainer)