// TO DO:
// Change navagation 'login' to 'logout' when user is currently logged in

import React from 'react';

import './LoginPage.style.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Redirect } from "react-router-dom";

// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import fire from '../../config/fire';


// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/plants',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

class LoginPage extends React.Component {
  // firebase custom auth
  /*
  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state={
      email : '',
      password : ''
    }
  }
  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((err) => {
      console.log(err);
    })
  }
  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
      console.log(u)
    }).catch((err) => {
      console.log(err);
    })
  }
  handleChange(e) {
    this.setState({
      [e.target.name] : e.target.value
    })
  }
  */ 

  render() {
    console.log(this.props);
    const { user } = this.props;
    const loggedIn = user && user.loggedIn;
    if (loggedIn) {
      return <Redirect to={{ pathname: "/plants", state: { from: this.props.location } }} />;
    } else {
      return (
        <Container className='login-container'>
          <div className='login-title bold'>Login</div>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label className='login-header'>Email address</Form.Label>
              <Form.Control
                className='login-input'
                type='email'
                placeholder='Enter email'
                disabled
                /* firebase custom auth 
                name='email'
                onChange={this.handleChange}
                value={this.state.email} */
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label className='login-header'>Password</Form.Label>
              <Form.Control
                className='login-input'
                type='password'
                placeholder='Password'
                disabled
                /* firebase custom auth
                name='password'
                onChange={this.handleChange}
                value={this.state.password} */
              />
            </Form.Group>
            <Button
              id='btnLogin'
              variant='outline-dark'
              type='submit'
              className='login-btn bold'
              disabled
              /* firebase custom auth
              onClick={this.login} */
              >
              Login
            </Button>
            <Button
              id='btnSignUp'
              variant='outline-dark'
              type='submit'
              className='login-btn bold'
              disabled
              /* firebase custom auth
              onClick={this.signup} */> 
              Sign Up
            </Button>
          </Form>
          <div className='login-sub-title'>Or login with your Google account.</div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </Container>
      );
    }
  }
}

export default LoginPage;
