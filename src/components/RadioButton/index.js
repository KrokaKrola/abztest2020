import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const RadioButton = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <label className="RadioButton">
      {label}
      <input {...field} {...props} />
      <span className="checkmark"></span>
    </label>
  );
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object
};

export default RadioButton;
