import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from './utility/constants.js'
import '../styles/main.css';

const SignUp = () => {
  //handles validation management
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  //
  const [show, setShow] = useState(true)
  const [serverResponse, setServerResponse] = useState('')
  const navigate = useNavigate()
  const submitForm = (data) => {
    if (data.password === data.confirmPassword) {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password
      };

      const requestOptions = {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      fetch(`${BACKEND_URL}/auth/signup`, requestOptions)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setServerResponse(data.message);
          console.log(serverResponse)
          setShow(true)
          navigate('/login')
          reset()
        })
        .catch(err => console.log(err))
    }
    else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="container">
      <div className="form">

        {show}
        <>
          <h1>Sign Up Page</h1>
          <Alert variant='success' onClose={() => setShow(false)} dismissible>
            <p>{serverResponse}</p>
          </Alert>

        </>


        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register('username', { required: true, maxLength: 80 })}
            />
          </Form.Group>
          {errors.username && (
            <span style={{ color: 'red' }}>Username is required</span>
          )}
          <br />

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register('email', { required: true, maxLength: 80 })}
            />
          </Form.Group>

          <br />

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register('password', { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br />

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true, minLength: 8 })}
            />
          </Form.Group>
          <br />

          <Form.Group>
            <Button variant="primary" onClick={handleSubmit(submitForm)}>
              SignUp
            </Button>
          </Form.Group>

          <br />

          <Form.Group>
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
