import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const TextInput = ({ label, helpInfo, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`TextInput ${
        meta.error && meta.touched ? 'TextInput--error' : ''
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} {...props} />
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
