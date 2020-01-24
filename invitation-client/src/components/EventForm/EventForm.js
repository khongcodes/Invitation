import React from 'react'

const EventForm = ({formData, handleChange, handleSubmit}) => (
  <form className='EventForm' onSubmit={event => handleSubmit(event)} >
    <label>What is the name of this event? <br/>
      <input 
        name = 'title'
        value = {formData.title}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Describe the event. <br/>
      <textarea 
        name = 'description'
        value = {formData.description}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>What is the event's location? <br/>
      <input 
        name = 'location'
        value = {formData.location}
        placeholder = 'Address/ZIP code/City/etc.'
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>What day does the event happen? <br/>
      <input 
        name = 'date'
        value = {formData.date}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>What time does the event happen? <br/>
      <input 
        name = 'time'
        value = {formData.time}
        onChange = {event => handleChange(event)}
      />
    </label>

    <input type='submit' value='Create Event' />
  </form>
)

export default EventForm