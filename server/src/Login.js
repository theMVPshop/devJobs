import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Add validation here

    try {
      const response = await axios.post('/api/authenticate', {
        username,
        password,
      });

        // Store the JWT in local storage
        localStorage.setItem('jwt', response.data.token);

              // Redirect the user to a dashboard or protected page
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <button className="submit-button" type="submit">Log In</button>
    </form>
  );
}

export default Login