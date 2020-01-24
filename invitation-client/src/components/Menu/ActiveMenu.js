import React from 'react'
import { Link } from 'react-router-dom'

const ActiveMenu = ({user, toggleMenu}) => (
  <div className='ActiveMenu container'>
    <MakeLink url='/' text='Create Event' fn={toggleMenu} /><br />

    {Object.entries(user).length===0 ? 
      <>
        <MakeLink url='/user/create' text='Create User' fn={toggleMenu} /><br />
        <LogInForm />
      </>
    :
      <div>show user link</div>
    }
  </div>
)

const MakeLink = ({url, text, fn}) => (
  <Link to={url} onClick={fn} className='ActiveMenuItem'>
    {text}
  </Link>
)

const LogInForm = () => (
  <div>
    Log In
    <form>
      <label>Username:<br />
        <input type='text'/>
      </label>

      <label>Password:<br/>
        <input type='password'/>
      </label>
      
      <input type='submit'/>
    </form>
  </div>
)

export default ActiveMenu