import React, { useState } from 'react';
import { auth } from '../../helpers/auth';

const Login = () => {

  const [username, setUsername] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    auth(username)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name='username' value={username} onChange={handleUsername} required />
      <button type='submit'>Log in</button>
    </form>
  );
}
 
export default Login;