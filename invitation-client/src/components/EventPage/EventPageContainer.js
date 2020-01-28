import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleRenderDate, handleRenderTime, handleRenderLocation } from '../handleDateTimeLocation';
import { getEvent, clearEvent } from '../../actions/eventActions';

class EventPageContainer extends Component {

  // do not load event to Redux store if already loaded during event creation
  componentDidMount() {
    if (Object.entries(this.props.event.data).length === 0) {
      const eventId = parseInt(this.props.match.params.id, 10);
      this.props.getEvent(eventId);
    }
  }

  componentWillUnmount() {
    this.props.clearEvent();
  }

  render() {
    const {title, description, location, time, date, id, user} = this.props.event.data;
    
    return (
      Object.entries(this.props.event.data).length === 0 ?
      <>
        <h2>Event {this.props.match.params.id} not found</h2>
      </>
      :
      <>
        <h2>{title}</h2>
        <p>Description:<br/>
          {description}
        </p>
        <p>Location: {handleRenderLocation(location)}</p>
        <p>Date: {handleRenderDate(date)}</p>
        <p>Time: {handleRenderTime(time)}</p>
        <p>User:{' '}
          {!!user ? <Link to={`/user/${user.id}`}>{ user.name }</Link> : 'none'}
        </p>
        
        {/* if authorized display edit button */}
        <>
          {this.props.event.authorize ? 
            <Link to={`/event/${id}/edit`}>
              <button>test Edit Event</button>
              {/* navigate to an edit page - push window history*/}
            </Link>
            
            
          : 'no authorization'}
        </>

      </>
    )
  }
}

const mapStateToProps = ({event}) => ({event})

const mapDispatchToProps = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  clearEvent: () => dispatch(clearEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer)