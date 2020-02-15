import React from 'react';

import './newPlantPage.style.scss';

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

class NewPlantPage extends React.Component {
  render() {
    return (
      <Container className='new-plant-container'>
        <Form>
          <Form.Row>
            <Col Col xs={12} md={6}>
              <div className='label'>Upload image section</div>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId='ControlInput1'>
                <Form.Label className='label'>Name</Form.Label>
                <Form.Control
                  type='name'
                  placeholder='Ex: "Bambis Velvet Vine" '
                  maxLength='70'
                />
              </Form.Group>
              <Form.Group controlId='ControlInput2'>
                <Form.Label className='label'>Species</Form.Label>
                <Form.Control
                  type='species'
                  placeholder='Ex: "Ruellia makoyana"'
                  maxLength='70'
                />
              </Form.Group>
              <Form.Group controlId='ControlInput3'>
                <Form.Label className='label'>Location</Form.Label>
                <Form.Control
                  type='location'
                  placeholder='Ex: "Upstairs office"'
                  maxLength='70'
                />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId='ControlTextarea1'>
                <Form.Label className='label'>Description</Form.Label>
                <Form.Control as='textarea' rows='3' maxLength='300' />
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row className='dropdown-row'>
            <Col md={4}>
              <Form.Label className='label'>Watering Preferences</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className='dropdown'>Select</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Action</Dropdown.Item>
                  <Dropdown.Item>Another action</Dropdown.Item>
                  <Dropdown.Item>Active Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <Form.Label className='label'>Watering Schedule</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className='dropdown'>Select</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Weekly</Dropdown.Item>
                  <Dropdown.Item>Daily</Dropdown.Item>
                  <Dropdown.Item>When dry</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={4}>
              <Form.Label className='label'>Sun Preferences</Form.Label>
              <Dropdown>
                <Dropdown.Toggle className='dropdown'>Select</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Full sun</Dropdown.Item>
                  <Dropdown.Item>Partial sun</Dropdown.Item>
                  <Dropdown.Item>Partial shade</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    );
  }
}

export default NewPlantPage;
