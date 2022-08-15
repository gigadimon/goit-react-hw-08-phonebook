import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import s from './ContactFormMarkup.module.css';
import { Button, TextField } from '@mui/material';

export function ContactFormMarkup({
  handleSubmit,
  handleChange,
  name,
  number,
  isAdding,
}) {
  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <TextField
        className={s.input}
        sx={{ marginBottom: '20px' }}
        size="small"
        id="outlined-basic"
        label="Name"
        variant="outlined"
        fullWidth
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <TextField
        className={s.input}
        sx={{ marginBottom: '20px' }}
        size="small"
        id="outlined-basic"
        label="Number"
        variant="outlined"
        fullWidth
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <Button variant="contained" type="submit" disabled={isAdding}>
        {isAdding && (
          <RotatingLines
            strokeColor="#fff"
            strokeWidth="5"
            animationDuration="0.75"
            width="18"
            visible={true}
          />
        )}
        {isAdding ? 'Adding...' : 'Add contact'}
      </Button>
    </form>
  );
}

ContactFormMarkup.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  isAdding: PropTypes.bool.isRequired,
};
