import React from 'react'

const EventForm = ({formData, handleChange, handleSubmit}) => (
  <form className='create-event-form' onSubmit={event => handleSubmit(event)} >
    <label>What is the name of this event?
      <input 
        name = 'title'
        value = {formData.title}
        onChange = {event => handleChange(event)}
      />
    </label><br/>

    <label>Describe the event.
      <input 
        name = 'description'
        value = {formData.description}
        onChange = {event => handleChange(event)}
      />
    </label><br/>

    <label>What is the event's location?
      <input 
        name = 'location'
        value = {formData.location}
        placeholder = 'Address/ZIP code/City/etc.'
        onChange = {event => handleChange(event)}
      />
    </label><br/>

    <label>What day does the event happen?
      <input 
        name = 'date'
        value = {formData.date}
        onChange = {event => handleChange(event)}
      />
    </label><br/>

    <label>What time does the event happen?
      <input 
        name = 'time'
        value = {formData.time}
        onChange = {event => handleChange(event)}
      />
    </label><br/>

    <input type='submit' value='Create Event' />
  </form>
)

export default EventForm