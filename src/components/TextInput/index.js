import React from 'react';
import { useField } from 'formik';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';

const TextInput = ({ label, helpInfo, mask, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`TextInput ${
        meta.error && meta.touched ? 'TextInput--error' : ''
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      {!mask ? (
        <input {...field} {...props} />
      ) : (
        <InputMask {...field} {...props} mask={mask} />
      )}

      <div className="TextInput__info">
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : (
          helpInfo || null
        )}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  helpInfo: PropTypes.string,
  props: PropTypes.object
};

export default TextInput;
