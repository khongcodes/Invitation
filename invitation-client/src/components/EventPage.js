import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEvent } from '../actions/eventActions';

class EventPage extends Component {

  // only load event to Redux store if not already loaded during event creation
  componentDidMount() {
    if (Object.entries(this.props.event.data).length === 0) {
      const eventId = parseInt(this.props.match.params.id, 10);
      this.props.getEvent(eventId);
    }
  }

  logProps = () => {
    console.log(this.props)
  }

  render() {
    return (
      this.props.event.status==='no match' ?
      <>
        <h2>Event {this.props.match.params.id} not found</h2>
      </>
      :
      <div>
        <p>Event {this.props.match.params.id}</p>
        <h2>{this.props.event.data.title}</h2>

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

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)