// TO DO:
// Change navagation 'login' to 'logout' when user is currently logged in

import React from "react";

import "./LoginPage.style.scss";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// Import FirebaseAuth and firebase.
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/plants",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
};

class LoginPage extends React.Component {
  signOut(event) {
    firebase.auth().signOut();
  }

  render() {
    console.log(firebase.auth());
    return (
      <Container className='login-container'>
        <div className='login-title bold'>Login (under construction)</div>
        <Form>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label className='bold'>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' disabled />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Label className='bold'>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' disabled />
          </Form.Group>
          <Button
            id='btnLogin'
            variant='outline-dark'
            type='submit'
            className='login-btn bold'
            disabled
          >
            Login
          </Button>
          <Button
            id='btnSignUp'
            variant='outline-dark'
            type='submit'
            className='login-btn bold'
            disabled
          >
            Sign Up
          </Button>
          <Button
            onClick={this.signOut}
            id='btnSignOut'
            variant='outline-dark'
            className='login-btn bold'
          >
            Sign Out
          </Button>
        </Form>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Container>
    );
  }
}

export default LoginPage;
