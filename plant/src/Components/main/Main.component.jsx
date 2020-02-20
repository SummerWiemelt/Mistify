import React from "react";

import "./main.style.scss";
import logo from "../../assets/plant-dark.svg";
import HomePage from "../../pages/homePage/HomePage.jsx";
import NewEditPlantPage from "../../pages/newEditPlantPage/NewEditPlantPage";

import ConnectPlantsPage from "../../pages/plantsPage/ConnectPlantsPage";
import LoginPage from "../../pages/loginPage/LoginPage";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import history from "../../globals/history";

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
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path='/' exact render={() => <HomePage />} />
        <Route path='/plants' render={() => <ConnectPlantsPage />} />
        <Route path='/login' render={() => <LoginPage />} />
        <Route path='/newPlant' render={props => <NewEditPlantPage {...props} />} />
      </Router>
    );
  }
}
export default Main;
