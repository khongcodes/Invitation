import React from 'react';

const EventPage = ({ title,  location, description, date, time, user }) => (
  <>
    <h2 className='event-title'>{ title }</h2>
    <p>Description: </p>
    <p className='event-description'>{ description }</p>

    <p>Location: { location }</p>
    <p>Date: { date }</p>
    <p>Time: { time }</p>
    <p>User: { user }</p>

  </>
)

export default EventPage