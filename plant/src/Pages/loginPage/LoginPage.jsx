// TO DO:
// Change navagation 'login' to 'logout' when user is currently logged in

import React from "react";

import "./LoginPage.style.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class LoginPage extends React.Component {
  render() {
    return (
      <Container className='login-container'>
        <div className='login-title bold'>Login (under construction)</div>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='bold'>Email address</Form.Label>
            <Form.Control id='loginEmail' type='email' placeholder='Enter email' />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label className='bold'>Password</Form.Label>
            <Form.Control
              id='loginPassword'
              type='password'
              placeholder='Password'
            />
          </Form.Group>
          <Button
            id='btnLogin'
            variant='outline-dark'
            type='submit'
            className='login-btn bold'
          >
            Login
          </Button>
          <Button
            id='btnSignUp'
            variant='outline-dark'
            type='submit'
            className='login-btn bold'
          >
            Sign Up
          </Button>
        </Form>
      </Container>
    );
  }
}

export default LoginPage;
