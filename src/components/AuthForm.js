import React, { useState } from 'react';
import { authService } from 'fbase';

// const inputStyles = {};

const AuthForm = () => {
  const [newAccount, setNewAccount] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChage = event => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  const onSubmit = async event => {
    event.preventDefault();
    try {
      let data = null;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChage}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChage}
          className="authInput"
        />
        <button type="submit" className="authInput authSubmit">
          {newAccount ? 'Create Account' : 'Log In'}
        </button>
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Sign in' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
