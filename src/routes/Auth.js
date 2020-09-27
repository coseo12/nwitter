import React from 'react';
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
  const onSocialClick = event => {
    const {
      target: { name },
    } = event;
    let provider = null;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    authService.signInWithPopup(provider);
  };

  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="authBtns">
        <button
          className="authBtn"
          name="google"
          type="button"
          onClick={onSocialClick}
        >
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button
          className="authBtn"
          name="github"
          type="button"
          onClick={onSocialClick}
        >
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
