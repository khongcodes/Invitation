import React from 'react'

const UserForm = ({formData, handleChange, handleSubmit}) => (
  <form className='Form' onSubmit={event => handleSubmit(event)}>
    <label>Username: <br />
      <input 
        name = 'username'
        value = {formData.username}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Password: <br/>
      <input type='password'
        name = 'password'
        value = {formData.password}
        onChange = {event => handleChange(event)}
      />
    </label>

    <hr/>

    <label>Name: <br/>
      <input 
        name = 'name'
        value = {formData.name}
        onChange = {event => handleChange(event)}
      />
    </label>

    <label>Image URL: <br/>
      <input 
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

    <input type='submit' value='Create User'/>
  </form>
)

export default UserForm