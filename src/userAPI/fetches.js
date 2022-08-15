import axios from 'axios';
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

export const fetchContacts = () => {
  return axios.get('/contacts');
};

export const addContact = newContact => {
  return axios.post('/contacts', newContact);
};

export const deleteContact = id => {
  return axios.delete(`/contacts/${id}`);
};

export const signUpUser = newUser => {
  return axios.post('/users/signup', newUser);
};

export const logInUser = user => {
  return axios.post('/users/login', user);
};

export const logOutUser = () => {
  return axios.post('/users/logout');
};
