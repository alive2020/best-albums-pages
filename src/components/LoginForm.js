import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

const LoginForm = ({ login, error }) => {
  const [details, setDetails] = useState({ email: '', password: '' });

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    let temp = login(details);
    temp && history.push('/');
  };

  return (
    <form className='card' onSubmit={submitHandler}>
      <div className='form-inner card-body'>
        <h2 className='pb-3'>Login</h2>
        {error !== '' ? <div className='error'>{error}</div> : ''}
        <div className='form-group'>
          <label className='form-label' htmlFor='email'>
            Email:
          </label>
          <input
            className='form-control'
            type='email'
            name='email'
            id='email'
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className='form-group'>
          <label className='form-label' htmlFor='password'>
            Password:
          </label>
          <input
            className='form-control'
            type='password'
            name='password'
            id='password'
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          LOGIN
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
