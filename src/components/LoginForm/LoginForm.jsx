import s from './LoginForm.module.css';
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser } from 'redux/authSlice';
import { selectLogin } from 'redux/selectors';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectLogin);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Fields cannot be empty', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    dispatch(logInUser({ email, password }));

    setPassword('');
    setEmail('');
  }

  return (
    <>
      {!isLoggedIn && (
        <form className={s.form} onSubmit={handleSubmit}>
          <TextField
            sx={{ marginBottom: '10px' }}
            size="small"
            id="outlined-basic"
            label="E-mail"
            type="email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            sx={{ marginBottom: '10px' }}
            size="small"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" className={s.button}>
            Log In
          </Button>
        </form>
      )}

      <ToastContainer />
    </>
  );
}
