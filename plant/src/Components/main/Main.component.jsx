import React from "react";

import "./navigation.style.scss";
import logo from "../../assets/plant-dark.svg";
import HomePage from "../../pages/homePage/HomePage.jsx";
import NewPlantPage from "../../pages/newPlantPage/NewPlantPage";
import ViewPlantPage from "../../pages/viewPlant/ViewPlantPage";
import ConnectPlantsPage from "../../pages/plantsPage/ConnectPlantsPage";
import LoginPage from "../../pages/loginPage/LoginPage";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: {
        home: { title: "Mistify", path: "/" },
        plants: { title: "Plants", path: "/plants" },
        login: { title: "Login", path: "/login" }
      }
    };
  }
  render() {
    return (
      <Router>
        <Navbar
          className='navbar'
          collapseOnSelect
          expand='lg'
          bg='light'
          variant='light'
        >
          <LinkContainer to={this.state.routes.home.path}>
            <Navbar.Brand>
              {" "}
              <img
                src={logo}
                width='35'
                height='30'
                className='d-inline-block align-top nav-logo'
                alt='logo'
              />
              <span className='nav-title'>{this.state.routes.home.title}</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to={this.state.routes.plants.path}>
                <Nav.Link>{this.state.routes.plants.title}</Nav.Link>
              </LinkContainer>
              <LinkContainer to={this.state.routes.login.path}>
                <Nav.Link>{this.state.routes.login.title}</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route
          path={this.state.routes.home.path}
          exact
          render={() => <HomePage />}
        />
        <Route
          path={this.state.routes.plants.path}
          render={() => <ConnectPlantsPage />}
        />
        <Route path={this.state.routes.login.path} render={() => <LoginPage />} />
        <Route path='/newPlant' render={() => <NewPlantPage />} />
        <Route path='/viewPlant' render={() => <ViewPlantPage />} />
      </Router>
    );
  }
}
export default Main;
