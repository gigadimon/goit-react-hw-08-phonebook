import { createReducer, createAction } from '@reduxjs/toolkit';

export const putFilter = createAction('contacts/putFilter');

export const filterReducer = createReducer('', {
  [putFilter]: (_, action) => action.payload,
});
