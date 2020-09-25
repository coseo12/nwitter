import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChage = event => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    if (name === 'email') setEmail(value);
    else setPassword(value);
  };

  const onSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChage}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChage}
        />
        <button type="submit">Log In</button>
      </form>
      <div>
        <button type="button">Continue with Google</button>
        <button type="button">Continue with Github</button>
      </div>
    </div>
  );
};

export default Auth;
