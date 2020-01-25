import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import { getEvent } from '../../actions/eventActions';

class EventPageContainer extends Component {

  // only load event to Redux store if not already loaded during event creation
  
  componentDidMount() {
    if (Object.entries(this.props.event.data).length === 0) {
      const eventId = parseInt(this.props.match.params.id, 10);
      this.props.getEvent(eventId);
    }
  }

  logProps = () => {
    console.log(this.props.event.data)
  }

  render() {
    const {title, description, location, time, date, id, user} = this.props.event.data;
    
    return (
      Object.entries(this.props.event.data).length === 0 ?
      <>
        <h2>Event {this.props.match.params.id} not found</h2>
        <button onClick={this.logProps}/>
      </>
      :
      <div>
        <p>Event {id}</p>
        <h2>{title}</h2>
        <p>Description:<br/>
          {description}
        </p>
        <p>Location: {location}</p>
        <p>Time: {time}</p>
        <p>Date: {date}</p>
        <p>User:{' '}
          {!!user ? 
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          :
          'none'}
        </p>
        <button onClick={this.logProps}>log props</button>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  event: state.event
})

const mapDispatchToProps = dispatch => ({
  getEvent: (id) => dispatch(getEvent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer)