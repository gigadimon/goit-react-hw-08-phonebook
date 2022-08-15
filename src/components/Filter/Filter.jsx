import s from './Filter.module.css';

import { putFilter } from 'redux/filterSlice';
import { useDispatch } from 'react-redux/es/exports';
import { TextField } from '@mui/material';
import debounce from 'lodash.debounce';
import { useEffect, useMemo } from 'react';

export default function Filter() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(putFilter(''));
    };
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleChange(event) {
    dispatch(putFilter(event.target.value));
  }

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange]
  );

  return (
    <TextField
      sx={{
        '& .MuiInputBase-input': {
          height: 30,
          padding: '4px 14px',
        },
        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root': {
          fontSize: '14px',
          top: '-7px',
        },
      }}
      id="outlined-search"
      label="Find contacts by name"
      type="search"
      name="filter"
      onChange={debouncedHandleChange}
      className={s.input}
    />
  );
}
