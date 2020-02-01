import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import TextOverflowTooltip from '../TextOverflowTooltip';

const FileUpload = ({
  label,
  setImageField,
  fileName,
  setFileName,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = e => {
    const file = e.currentTarget.files[0];

    if (file.size > 5000000) {
      helpers.setError('The photo size must not be greater than 5 Mb.');
      return false;
    }

    setImageField(file);
    const reader = new FileReader();
    const img = new Image();
    img.title = file.name;
    reader.onload = function(event) {
      img.src = event.target.result;
      helpers.setError(null);
      if (file.name) {
        setFileName(file.name);
      } else {
        helpers.setError('Error');
        setFileName(null);
      }
    };
    img.addEventListener('load', () => {
      if (img.width < 75 || img.height < 75)
        helpers.setError('Image width and height must be greater then 75x75');
    });
    reader.readAsDataURL(file);
  };
  return (
    <div
      className={`FileUpload ${
        meta.error && meta.touched
          ? 'FileUpload--error'
          : fileName
          ? 'FileUpload--success'
          : ''
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <TextOverflowTooltip
        popoverPlacement="bottom"
        maxWidth="70%"
        className=" text-overflow-tooltip"
      >
        {fileName || 'Upload your photo'}
      </TextOverflowTooltip>

      <input
        {...field}
        {...props}
        onChange={o => {
          handleChange(o);
        }}
        accept="image/jpeg,image/jpg"
      />
      <button>Browse</button>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

FileUpload.propTypes = {
  label: PropTypes.string.isRequired,
  setImageField: PropTypes.func.isRequired,
  fileName: PropTypes.string,
  setFileName: PropTypes.func,
  props: PropTypes.object
};

export default FileUpload;
