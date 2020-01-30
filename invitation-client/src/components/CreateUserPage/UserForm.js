import React from 'react'

const UserForm = ({ formData, handleChange, handleSubmit, submitText, editUser }) => (
  <form className='Form' onSubmit={event => handleSubmit(event)}>
    {!editUser ? <label>Username: <br />
      <input 
        className = 'standard-input' 
        type = 'text'
        name = 'username'
        value = {formData.username}
        onChange = {event => handleChange(event)}
      />
    </label> : <></>}

    <label>Password: <br/>
      <input
        className = 'standard-input' 
        type = 'password'
        name = 'password'
        value = {formData.password}
        onChange = {event => handleChange(event)}
      />
    </label>

    <hr/>

    <label>Name: <br/>
      <input 
        className = 'standard-input' 
        type = 'text'
        name = 'name'
        value = {formData.name}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Image URL: <br/>
      <input 
        className = 'standard-input' 
        type = 'text'
        name = 'img_url'
        value = {formData.img_url}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Bio: <br/>
      <textarea 
        name = 'bio'
        value = {formData.bio}
        onChange = {event => handleChange(event)}
      />
    </label>

    <input type='submit' value={submitText}/>
  </form>
)

export default UserForm