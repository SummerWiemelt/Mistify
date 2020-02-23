import React from 'react';

import history from '../../globals/history';
import './newEditPlantPage.style.scss';
import { Plant, createNewPlant } from '../../services/PlantApp.service';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

// Object Property Constants
const WATERING_PREFERENCES = [
  'When dry to touch',
  'Thoroughly, until drained',
  'Immersed in water',
  'From bottom',
  'Mist'
];

const SUN_PREFERENCES = [
  'Full Sun',
  'Partial Sun',
  'Partial Shade',
  'Indirect Sun',
  'Full Shade'
];

// maps through dropdown options
function renderOptions(props) {
  return props.map(option => {
    return <option key={option}>{option}</option>;
  });
}

class NewEditPlantPage extends React.Component {
  constructor(props) {
    super(props);
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

      //default dropdown
      newPlant.sunPreference = SUN_PREFERENCES[0];
      newPlant.wateringPreference = WATERING_PREFERENCES[0];
      this.state = {
        plant: newPlant,
        error: null,
        isLoading: false
      };
    }
    if (this.props && this.props.user && this.props.user.currentUser) {
      // Always assign the current user's UID to the plant's uid
      this.state.plant.uid = this.props.user.currentUser.uid;
    }
  }

  onNewEditPlant = formEvent => {
    formEvent.preventDefault(); // Prevent page reload
    this.setState({
      isLoading: true
    });
    if (this.state.plant.id) {
      // Modify / Edit plant
    } else {
      // createNewPlant from PlantApp.service
      createNewPlant(this.state.plant).then(result => {
        if (result.success) {
          // pushes new plant to plants
          this.props.history.push('/plants');
        } else {
          this.setState({
            isLoading: false,
            error: result.errorMessage
          });
        }
      });
    }
  };

  onNameChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      name: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onSpeciesChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      species: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onLocationChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      location: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onDescriptionChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      description: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onWateringPreferenceChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      wateringPreference: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onSunPreferenceChange = inputEvent => {
    let newPlant = {};
    Object.assign(newPlant, this.state.plant, {
      sunPreference: inputEvent.target.value
    });
    this.setState({
      plant: newPlant
    });
  };

  onPlantImageChanged = event => {
    //files is defined, and there's at least one
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = e => {
        this.state.plant.setBase64String(e.target.result);
        this.setState({
          plant: this.state.plant
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  render() {
    console.log(this.state);
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    } else if (this.state.isLoading) {
      return (
        <Spinner variant='secondary' animation='border' role='status'>
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
                <Form.Group type='text' controlid='name'>
                  <Form.Label className='label'>
                    Name<span className='required'> *</span>
                  </Form.Label>
                  <Form.Control
                    onChange={this.onNameChange}
                    defaultValue={this.state.name}
                    required
                    type='name'
                    placeholder='Ex: "Bambis Velvet Vine" '
                    maxLength='70'
                  />
                </Form.Group>
                <Form.Group type='text' controlid='species'>
                  <Form.Label className='label'>Species</Form.Label>
                  <Form.Control
                    onChange={this.onSpeciesChange}
                    defaultValue={this.state.species}
                    type='species'
                    placeholder='Ex: "Ruellia makoyana"'
                    maxLength='70'
                  />
                </Form.Group>
                <Form.Group type='text' controlid='location'>
                  <Form.Label className='label'>Location</Form.Label>
                  <Form.Control
                    onChange={this.onLocationChange}
                    defaultValue={this.state.location}
                    type='location'
                    placeholder='Ex: "Upstairs office"'
                    maxLength='70'
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <div className='label'>
                  Upload an image<span className='required'> *</span>
                </div>
                <label htmlFor='plantFile'></label>
                <input
                  onChange={this.onPlantImageChanged}
                  type='file'
                  id='plantFile'
                  name='plantImage'
                />
                {renderPlantImage(this.state.plant)}
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group type='text' controlid='description'>
                  <Form.Label className='label'>Description</Form.Label>
                  <Form.Control
                    onChange={this.onDescriptionChange}
                    defaultValue={this.state.description}
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
                  onChange={this.onWateringPreferenceChange}
                  defaultValue={this.state.wateringPreference}
                  as='select'>
                  {renderOptions(WATERING_PREFERENCES)}
                </Form.Control>
              </div>
              <div>
                <Form.Label className='label' controlid='sunPreference'>
                  Sun Preference<span className='required'> *</span>
                </Form.Label>
                <Form.Control
                  required
                  onChange={this.onSunPreferenceChange}
                  defaultValue={this.state.sunPreference}
                  as='select'>
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
                type='submit'>
                Submit
              </Button>
            </Form.Row>
          </Form>
        </Container>
      );
    }
  }
}

function renderPlantImage(plant) {
  if (!plant) {
    return null;
  }
  let imageBase64String = plant.getBase64String();
  if (imageBase64String && imageBase64String.length > 0) {
    //if it exists
    return (
      <img
        id='profileImage'
        src={imageBase64String}
        className='center-upload-image'
      />
    );
  } else if (plant.main_img_url && plant.main_img_url.length > 0) {
    return (
      <img
        id='profileImage'
        src={plant.main_img_url}
        className='center-upload-image'
      />
    );
  } else {
    return null;
  }
}

export default NewEditPlantPage;
