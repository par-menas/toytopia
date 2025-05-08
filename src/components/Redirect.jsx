import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const RedirectIfNotSignedIn = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setMessage('You are not signed in. Redirecting to the sign-in page...');
      setTimeout(() => {
        navigate('/signin');  // Redirect to the sign-in page
      }, 1000000); // 3 seconds delay before redirect
    }
  }, [user, navigate]);

  return (
    <div>
      {message && <div className="alert alert-warning text-center">{message}</div>}
    </div>
  );
};

export default RedirectIfNotSignedIn;
