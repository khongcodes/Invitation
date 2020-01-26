import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addEvent } from '../../actions/eventActions';
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

  changeDate = date => this.setState({ date })

  changeTime = time => this.setState({ time })

  pushHistory = eventResource => {
    this.props.history.push(`/event/${eventResource.id}`)
  }

  // submit, along with current user id
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    // this.props.addEvent({
    //   ...this.state,
    //   user_id: this.props.sessionUser.data.id
    // }, this.pushHistory)
  }
  
  render() {
    return (
      <div className='FormContainer'>
        <h2 className='Form header'>Create an event.</h2>
          <EventForm 
            formData = {this.state}
            handleChange = {this.handleChange}
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