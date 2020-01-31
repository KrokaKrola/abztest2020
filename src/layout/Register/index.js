import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import usePositions from '../../hooks/usePositions';
import { useAppState } from '../../store/app-state';
import { instance } from '../../service/settings';

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
const FileUpload = ({ label, setImageField, fileName, setFileName, ...props }) => {
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
      <span>{fileName || 'No file choosen'}</span>
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

const Register = () => {
  const [imageField, setImageField] = useState('');
  const [fileName, setFileName] = useState('');

  const positions = usePositions();
  const initialPosition = positions.length && positions[0].id;

  const [{token}, dispatch] = useAppState();

  return (
    <figure className="Register">
      <div className="container">
        <h2 className="section-header">Register to get a work</h2>
        <span className="subinfo">
          Attention! After successful registration and alert, update the list of
          users in the block from the top
        </span>
        {!!positions.length && (
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              position_id: initialPosition + '',
              photo: ''
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(2, 'Must be at least 2 charachters')
                .max(60, 'Must be 60 charachters or less')
                .required('Error'),
              email: Yup.string()
                .min(2, 'Must be at least 2 charachters')
                .max(100, 'Too many charachters')
                .matches(
                  // eslint-disable-next-line no-control-regex
                  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                  'Email is not valid'
                )
                .required('Error'),
                phone: Yup.string()
                .matches(
                  // eslint-disable-next-line no-useless-escape
                  /^[\+]{0,1}380([0-9]{9})$/,
                  'Your phone number should start with +380'
                )
                .required('Error')
            })}
            onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
              
                if (!imageField) {
                  setErrors({ photo: 'Error' });
                  return;
                }
                let formData = new FormData();
                formData.append('position_id', values.position_id);
                formData.append('name', values.name);
                formData.append('email', values.email);
                formData.append('phone', values.phone);
                formData.append('photo', imageField);
                instance({
                  method: 'POST',
                  url: '/users',
                  data: formData,
                  headers: {
                    'Token': token,
                  },
                }).then((result) => {
                    dispatch({type: 'CLEAN_USERS'});
                    dispatch({type: 'SET_PAGE', page: {number: 1, reset: true}})
                    
                    resetForm();
                    setFileName(null);
                    setImageField(null);
                }).catch(error => {
                  const errorsObject = {};
                  const response = error.response;
                  if(response.status === 401) {
                    console.log('tokken expired');
                  } else if (response.status === 409) {
                    if(response.data.message.indexOf('email') !== -1) {
                      errorsObject['email'] = 'User with this email already exists'
                    }
                    if(response.data.message.indexOf('phone') !== -1) {
                      errorsObject['phone'] = 'User with this phone already exists'
                    }
                  } else if(response.status === 422) {
                    const data = response.data.fails;
                    
                    if(data.hasOwnProperty('name') && !!data.name[0]) {
                      errorsObject['name'] = data.name[0];
                    }
                    if(data.hasOwnProperty('email') && !!data.email[0]) {
                      errorsObject['email'] = data.email[0];
                    }
                    if(data.hasOwnProperty('phone') && !!data.phone[0]) {
                      errorsObject['phone'] = data.phone[0];
                    }
                    if(data.hasOwnProperty('photo') && !!data.photo[0]) {
                      errorsObject['photo'] = data.photo[0];
                    }
                  }
                  setErrors(errorsObject);
                }).finally(() => {
                  setSubmitting(false);
                })
            }}
          >
            <Form>
              <TextInput
                label="Name"
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
              />
              <TextInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
              />
              <TextInput
                label="Phone number"
                id="phone"
                name="phone"
                type="text"
                placeholder="+380 XX XXX XX XX"
                helpInfo="Enter phone number in open format"
              />
              <p>Select your position</p>
              {positions.map(item => (
                <RadioButton
                  key={item.id}
                  label={item.name}
                  name="position_id"
                  type="radio"
                  value={item.id + ''}
                />
              ))}
              <FileUpload
                label="Photo"
                name="photo"
                type="file"
                setImageField={setImageField}
                placeholder="Upload your photo"
                fileName={fileName}
                setFileName={setFileName}
              />
              <button type="submit" className="btn">
                Sign up now
              </button>
            </Form>
          </Formik>
        )}
      </div>
    </figure>
  );
};

export default Register;
