import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import usePositions from '../../hooks/usePositions';
import { useAppState } from '../../store/app-state';
import { instance } from '../../service/settings';
import TextInput from '../../components/TextInput';
import FileUpload from '../../components/FileUpload';
import RadioButton from '../../components/RadioButton';
import {
  requiredError,
  maxError,
  phoneError,
  emailError,
  minStringError,
  maxStringError
} from '../../utils/errorMessages';
import { emailPattern, UAPhoneNumber } from '../../utils/patterns';

const Register = () => {
  const [imageField, setImageField] = useState('');
  const [fileName, setFileName] = useState('');

  const positions = usePositions();
  const initialPosition = positions.length && positions[0].id;

  const [{ token }, dispatch] = useAppState();

  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);
    if (!imageField) {
      setErrors({ photo: requiredError('Photo') });
      setSubmitting(false);
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
        Token: token
      }
    })
      .then(result => {
        dispatch({ type: 'CLEAN_USERS' });
        dispatch({
          type: 'SET_NEXT_PAGE',
          nextPage: { link: null, regId: result.data.user_id }
        });
        dispatch({ type: 'CHANGE_MODAL_STATE', modalShow: true });
        resetForm();
        setFileName(null);
        setImageField(null);
        instance.get('/token').then(response => {
          const token = response.data.token;
          dispatch({ type: 'SET_TOKEN', token: token });
        });
      })
      .catch(error => {
        const errorsObject = {};
        const response = error.response;
        if (response.status === 401) {
          console.log('token expired');
        } else if (response.status === 409) {
          if (response.data.message.indexOf('email') !== -1) {
            errorsObject['email'] = 'User with this email already exists';
          }
          if (response.data.message.indexOf('phone') !== -1) {
            errorsObject['phone'] = 'User with this phone already exists';
          }
        } else if (response.status === 422) {
          const data = response.data.fails;

          if (data.hasOwnProperty('name') && !!data.name[0]) {
            errorsObject['name'] = data.name[0];
          }
          if (data.hasOwnProperty('email') && !!data.email[0]) {
            errorsObject['email'] = data.email[0];
          }
          if (data.hasOwnProperty('phone') && !!data.phone[0]) {
            errorsObject['phone'] = data.phone[0];
          }
          if (data.hasOwnProperty('photo') && !!data.photo[0]) {
            errorsObject['photo'] = data.photo[0];
          }
        }
        setErrors(errorsObject);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <figure className="Register" id="register">
      <div className="container">
        {!!positions.length ? (
          <>
            <h2 className="section-header">Register to get a work</h2>
            <span className="subinfo">
              Attention! After successful registration and alert, update the
              list of users in the block from the top
            </span>
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
                  .min(2, minStringError(2))
                  .max(60, maxStringError(60))
                  .required(requiredError('Name')),
                email: Yup.string()
                  .min(2, minStringError(2))
                  .max(100, maxError)
                  .matches(emailPattern, emailError)
                  .required(requiredError('Email')),
                phone: Yup.string()
                  .matches(UAPhoneNumber, phoneError)
                  .required(requiredError('Phone')),
              })}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <TextInput
                    label="Name"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    disabled={isSubmitting ? true : false}
                  />
                  <TextInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    disabled={isSubmitting ? true : false}
                  />
                  <TextInput
                    label="Phone number"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="+380 XX XXX XX XX"
                    helpInfo="Enter phone number in international format"
                    mask="+380 99 999 99 99"
                    disabled={isSubmitting ? true : false}
                  />
                  <p>Select your position</p>
                  {positions.map(item => (
                    <RadioButton
                      key={item.id}
                      label={item.name}
                      name="position_id"
                      type="radio"
                      value={item.id + ''}
                      disabled={isSubmitting ? true : false}
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
                    disabled={isSubmitting ? true : false}
                  />
                  <button
                    type="submit"
                    className="btn"
                    disabled={isSubmitting ? true : false}
                  >
                    Sing up now
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <h2 className="section-header">
            Registration is not available right now.
          </h2>
        )}
      </div>
    </figure>
  );
};

export default Register;
