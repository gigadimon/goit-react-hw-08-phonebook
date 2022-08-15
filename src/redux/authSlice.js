import axios from 'axios';
import { toast } from 'react-toastify';
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from 'userAPI';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
};

export const registerUser = createAsyncThunk(
  'auth/createNewUser',
  async (newUser, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.signUpUser(newUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      return data;
    } catch (error) {
      toast.error(
        'An error has occurred. The data is invalid or such an account is already registered',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return rejectWithValue(error);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await userAPI.logInUser(user);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      toast.error(
        'An error has occurred. The data is incorrect or the account is not registered',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userAPI.logOutUser();
      axios.defaults.headers.common['Authorization'] = '';
      return data;
    } catch (error) {
      toast.error('Something went wrong...', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return rejectWithValue(error);
    }
  }
);

export const authReducer = createReducer(initialState, {
  [logOutUser.fulfilled]: () => {
    return {
      user: {
        name: null,
        email: null,
      },
      token: null,
      isLoggedIn: false,
    };
  },
  [registerUser.fulfilled]: (_, action) => ({
    ...action.payload,
    isLoggedIn: true,
  }),
  [logInUser.fulfilled]: (_, action) => ({
    ...action.payload,
    isLoggedIn: true,
  }),
});
