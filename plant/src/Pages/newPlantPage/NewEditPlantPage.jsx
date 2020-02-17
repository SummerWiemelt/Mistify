import React from "react";

import "./newPlantPage.style.scss";
import { Plant, createNewPlant } from "../../services/PlantApp.service";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

// Object Property Constants
const ID_KEY = "id";
const NAME_KEY = "name";
const SPECIES_KEY = "species";
const LOCATION_KEY = "location";
const DESCRIPTION_KEY = "description";
const WATERING_PREFERENCE_KEY = "waterPreference";
const SUN_PREFERENCE_KEY = "sunPreference";

const WATERING_PREFERENCES = [
  "When dry to touch",
  "Thoroughly, until drained",
  "Immersed in water",
  "From bottom",
  "Mist"
];

const SUN_PREFERENCES = [
  "Full Sun",
  "Partial Sun",
  "Partial Shade",
  "Indirect Sun",
  "Full Shade"
];

function renderOptions(props) {
  return props.map(option => {
    return <option key={option}>{option}</option>;
  });
}

class NewEditPlantPage extends React.Component {
  constructor() {
    super();
    if (this.props && this.props.plant) {
      // Edit flow- plant already exists
      this.state = {
        plant: this.props.plant,
        error: null,
        isLoading: false
      };
    } else {
      // New flow- creating new plant
      let newPlant = new Plant();
      newPlant.setSunPreference(SUN_PREFERENCES[0]);
      newPlant.setWateringPreference(WATERING_PREFERENCES[0]);
      this.state = {
        plant: newPlant,
        error: null,
        isLoading: false
      };
    }
  }

  onNewEditPlant = formEvent => {
    formEvent.preventDefault(); // Prevent page reload
    this.setState({
      isLoading: true
    });
    console.log("setState");
    if (this.state.plant.id) {
      // Modify / Edit plant
    } else {
      createNewPlant(this.state.plant).then(result => {
        if (result.success) {
          this.props.history.push("/plants");
        } else {
          this.setState({
            isLoading: false,
            error: result.errorMessage
          });
        }
      });
    }
  };

  handleInputChange = setValue => inputEvent => {
    // Gets input from form
    let newPlant = setValue(inputEvent.target.value);
    this.setState({
      plant: newPlant
    });
  };

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    } else if (this.state.isLoading) {
      return (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <Container className='new-plant-container'>
          <Row className='new-plant-title-row'>
            <span className='new-plant-title'>Create a new plant</span>
          </Row>
          <Form onSubmit={this.onNewEditPlant}>
            <Form.Row>
              <Col xs={12} md={6}>
                <div className='label'>
                  Upload image section<span className='required'> *</span>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group type='text' controlid='name'>
                  <Form.Label className='label'>
                    Name<span className='required'> *</span>
                  </Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange(this.state.plant.setName)}
                    defaultValue={this.state[NAME_KEY]}
                    required
                    type='name'
                    placeholder='Ex: "Bambis Velvet Vine" '
                    maxLength='70'
                  />
                </Form.Group>
                <Form.Group type='text' controlid='species'>
                  <Form.Label className='label'>Species</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange(this.state.plant.setSpecies)}
                    defaultValue={this.state[SPECIES_KEY]}
                    type='species'
                    placeholder='Ex: "Ruellia makoyana"'
                    maxLength='70'
                  />
                </Form.Group>
                <Form.Group type='text' controlid='location'>
                  <Form.Label className='label'>Location</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange(this.state.plant.setLocation)}
                    defaultValue={this.state[LOCATION_KEY]}
                    type='location'
                    placeholder='Ex: "Upstairs office"'
                    maxLength='70'
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group type='text' controlid='description'>
                  <Form.Label className='label'>Description</Form.Label>
                  <Form.Control
                    onChange={this.handleInputChange(
                      this.state.plant.setDescription
                    )}
                    defaultValue={this.state[DESCRIPTION_KEY]}
                    as='textarea'
                    rows='3'
                    maxLength='300'
                  />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row className='select-row' controlid='wateringPreference'>
              <div>
                <Form.Label className='label'>
                  Watering Preference<span className='required'> *</span>
                </Form.Label>
                <Form.Control
                  required
                  onChange={this.handleInputChange(
                    this.state.plant.setWateringPreference
                  )}
                  defaultValue={this.state[WATERING_PREFERENCE_KEY]}
                  as='select'
                >
                  {renderOptions(WATERING_PREFERENCES)}
                </Form.Control>
              </div>
              <div>
                <Form.Label className='label' controlid='sunPreference'>
                  Sun Preference<span className='required'> *</span>
                </Form.Label>
                <Form.Control
                  required
                  onChange={this.handleInputChange(
                    this.state.plant.setSunPreference
                  )}
                  defaultValue={this.state[SUN_PREFERENCE_KEY]}
                  as='select'
                >
                  {renderOptions(SUN_PREFERENCES)}
                </Form.Control>
              </div>
            </Form.Row>
            <Form.Row className='submit-row'>
              <Col>
                <span className='required'>*</span>required
              </Col>
              <Button
                className='submit-button label'
                variant='outline-dark'
                type='submit'
              >
                Submit
              </Button>
            </Form.Row>
          </Form>
        </Container>
      );
    }
  }
}

export default NewEditPlantPage;
