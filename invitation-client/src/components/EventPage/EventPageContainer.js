import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { handleRenderDate, handleRenderTime, handleRenderLocation } from '../handleDateTimeLocation';
import { getEvent, clearEvent } from '../../actions/eventActions';
import '../../style/Event.css'

class EventPageContainer extends Component {

  // do not load event to Redux store if already loaded during event creation
  componentDidMount() {
    const eventId = parseInt(this.props.match.params.id, 10);
    this.props.getEvent(eventId);
  }

  componentWillUnmount() {
    this.props.clearEvent();
  }

  render() {
    const status = this.props.event.status;
    const {message, title, description, location, time, date, id, user} = this.props.event.data;
    
    if (status === 'failure') {
      return (<h2>{ message }</h2>);
    } else {
      return (
        <>
          <h2 className='event-title'>
            {title || 'untitled event'}
          </h2>
          
          <p>Description:</p>
          <p className='event-description'>
            {description || 'none'}
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
                <button className='edit-event'>Edit Event</button>
                {/* navigate to an edit page - push window history*/}
              </Link>
              : <></>
            }
          </>

        </>
      );
    }
  }
}

const mapStateToProps = ({event}) => ({event})

const mapDispatchToProps = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  clearEvent: () => dispatch(clearEvent())
})

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer)