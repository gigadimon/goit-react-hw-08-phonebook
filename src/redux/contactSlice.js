import {
  createReducer,
  createAction,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit';
import { userAPI } from 'userAPI';
import { filterReducer } from './filterSlice';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userAPI.fetchContacts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await userAPI.addContact(newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await userAPI.deleteContact(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const clearContacts = createAction('contacts/clearContacts');

const itemsReducer = createReducer([], {
  [getContacts.fulfilled]: (_, action) => action.payload,
  [addContact.fulfilled]: (state, action) => {
    state.push(action.payload);
  },
  [deleteContact.fulfilled]: (state, action) =>
    state.filter(contact => contact.id !== action.meta.arg),
  [clearContacts]: () => {
    return [];
  },
});

export const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

