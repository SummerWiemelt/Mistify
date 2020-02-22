import React from "react";

import "./main.style.scss";
import logo from "../../assets/plant-dark.svg";
import HomePage from "../../pages/homePage/HomePage.jsx";

import ConnectPlantsPage from "../../pages/plantsPage/ConnectPlantsPage";
import ConnectLoginPage from "../../pages/loginPage/ConnectLoginPage";
import ConnectNewEditPlantPage from "../../pages/newEditPlantPage/ConnectNewEditPlantPage";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import firebase from "firebase";

import history from "../../globals/history";
import ConnectPrivateRoute from "../privateRoute/ConnectPrivateRoute";

function onLogout() {
  firebase.auth().signOut();
  window.location.reload();
}

function loginOrOut(props) {
  const { user } = props;
  const loggedIn = user && user.loggedIn;
  if (loggedIn) {
    return <Nav.Link onClick={onLogout}>Logout</Nav.Link>;
  } else
    return (
      <LinkContainer to='/login'>
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
    );
}

class Main extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Navbar
          className='navbar'
          collapseOnSelect
          expand='lg'
          bg='light'
          variant='light'
        >
          <LinkContainer to='/'>
            <Navbar.Brand>
              {" "}
              <img
                src={logo}
                width='35'
                height='30'
                className='d-inline-block align-top nav-logo'
                alt='logo'
              />
              <span className='nav-title'>Mystify</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/plants'>
                <Nav.Link>Plants</Nav.Link>
              </LinkContainer>
              {loginOrOut(this.props)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route path='/' exact render={() => <HomePage />} />
          <Route path='/login' render={() => <ConnectLoginPage />} />
          <ConnectPrivateRoute
            path='/plants'
            render={props => <ConnectPlantsPage {...props} />}
          />
          <ConnectPrivateRoute
            path='/newPlant'
            render={props => <ConnectNewEditPlantPage {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default Main;
