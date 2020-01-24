import React from 'react'
import { Link } from 'react-router-dom'

const ActiveMenu = ({user, toggleMenu}) => (
  <div className='ActiveMenu container'>
    <Link to={'/'} onClick={toggleMenu} >Create Event</Link>
    
    {Object.entries(user).length===0 ? 
      <div>no user</div>
    :
      <div>user</div>
    }
  </div>
)

export default ActiveMenu