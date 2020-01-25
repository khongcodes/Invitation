import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ConditionalError from '../../components/ConditionalError';

const ActiveMenu = ({sessionUser, toggleMenu, login, logout}) => {
  const userLoggedIn = Object.entries(sessionUser.data).length === 0;

  return (
    <div className='ActiveMenu container'>
      <MakeLink url='/' text='Create Event' fn={toggleMenu} /><br />

      {userLoggedIn ? 
        <>
          <MakeLink url='/user/create' text='Create User' fn={toggleMenu} /><br />
          <LogInForm login={login} sessionUser={sessionUser} />
        </>
      :
        <>
          <MakeLink url={`/user/${sessionUser.data.id}`} text={sessionUser.data.name} fn={toggleMenu} /><br />
          <button onClick={logout}>Log Out</button>
        </>
      }
    </div>
  )
}

const MakeLink = ({url, text, fn}) => (
  <Link to={url} onClick={fn} className='ActiveMenuItem'>
    {text}
  </Link>
)

const LogInForm = ({login, sessionUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      Log In
      <ConditionalError condition={sessionUser.status==='Unauthorized'} text='Incorrect Credentials: Try again.' classText='LogIn'/>
      
      <form onSubmit={event => {
        event.preventDefault();
        login({username, password});
      }}>
        <label>Username:<br />
          <input type='text' value={username} onChange={event => setUsername(event.target.value)}/>
        </label>

        <label>Password:<br/>
          <input type='password' value={password} onChange={event => setPassword(event.target.value)}/>
        </label>
        
        <input type='submit'/>
      </form>
    </div>
  )
}

export default ActiveMenu