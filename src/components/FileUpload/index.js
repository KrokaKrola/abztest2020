import React from "react";
import { useField } from "formik";
import PropTypes from 'prop-types';

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
        helpers.setError("Error");
        setFileName(null);
      }
    };
    img.addEventListener("load", () => {
      if (img.width < 75 || img.height < 75)
        helpers.setError("Image width and height must be greater then 75x75");
    });
    reader.readAsDataURL(file);
  };
  return (
    <div
      className={`FileUpload ${
        meta.error && meta.touched
          ? "FileUpload--error"
          : fileName
          ? "FileUpload--success"
          : ""
      }`}
    >
      <span>{fileName || "No file choosen"}</span>
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
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
  props: PropTypes.object
}

export default FileUpload;