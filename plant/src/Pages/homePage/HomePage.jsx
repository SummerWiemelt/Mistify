import React from 'react';

import './HomePage.style.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    return (
      <Container fluid className='home-container'>
        <Row>
            <span className='home-text'>The easiest way to manage and care <br></br>for your plants.</span>
          <Link to='/plants'>
            <Button className='home-button' variant='outline-dark'>
              Go to my plants
            </Button>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default HomePage;
