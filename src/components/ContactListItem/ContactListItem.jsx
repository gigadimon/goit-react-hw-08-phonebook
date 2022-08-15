import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';
import { deleteContact } from 'redux/contactSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from '@mui/material';

import { RotatingLines } from 'react-loader-spinner';

export default function ContactListItem({ name, number, id }) {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState('');

  const handleClick = id => {
    setIsDeleting(true);
    dispatch(deleteContact(id)).finally(() => {
      setDeletingId(id);
      setIsDeleting(false);
    });
  };

  return (
    <>
      {deletingId !== id && (
        <li className={s.item}>
          <span className={s.name}>{name}:</span>{' '}
          <span className={s.number}>{number}</span>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleClick(id)}
            disabled={isDeleting}
          >
            {isDeleting && (
              <RotatingLines
                strokeColor="#1976d2"
                strokeWidth="5"
                animationDuration="0.75"
                width="18"
                visible={true}
              />
            )}
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </li>
      )}
    </>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
