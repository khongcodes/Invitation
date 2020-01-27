import React from 'react';
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker';

const EventForm = ({formData, handleChange, changeDate, changeTime, handleSubmit}) => (
  <form className='Form' onSubmit={event => handleSubmit(event)} >
    <label>What is the name of this event? <br/>
      <input
        className = 'standard-input' 
        name = 'title'
        value = {formData.title}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Describe the event. <br/>
      <textarea 
        // className = 'standard-input'
        name = 'description'
        value = {formData.description}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>What is the event's location? <br/>
      <input 
        className = 'standard-input' 
        name = 'location'
        value = {formData.location}
        placeholder = 'Address/ZIP code/City/etc.'
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>What day does the event happen? <br/>
      <DatePicker 
        name = 'date'
        value = {formData.date}
        onChange = {changeDate}
      />
    </label>

    <label>What time does the event happen? <br/>
      <TimePicker 
        name = 'time'
        value = {formData.time}
        onChange = {changeTime}
        size = {100}
      />
    </label>

    <input type='submit' value='Create Event' />
  </form>
)

export default EventForm