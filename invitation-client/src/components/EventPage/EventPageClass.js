import React, { Component } from 'react';

class EventPage extends Component {
  state = {
    counter: 0
  }

  increment() {
    this.setState(prevState => ({
      counter: prevState.counter + 1
    }))
  }

  render() {
    const { title,  location, description, date, time, user } = this.props
    return( 
      <>
        <h2 className='event-title'>{ title }</h2>
        <p>Description: </p>
        <p className='event-description'>{ description }</p>

        <p>Location: { location }</p>
        <p>Date: { date }</p>
        <p>Time: { time }</p>
        <p>User: { user }</p>
        <p onClick={this.increment.bind(this)} >Counter: { this.state.counter } </p>
      </>
    )
  }
}

export default EventPage