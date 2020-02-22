import React from "react";

import "./listPlants.style.scss";
import plantImage from "../../assets/plant-test.jpg";
import { deletePlant } from "../../services/PlantApp.service";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { Link } from "react-router-dom";

class ListPlants extends React.Component {
  // delete plant service
  onDeletePlant = plant => () => {
    deletePlant(plant.id);
  };

  // card component
  render() {
    if (this.props) {
      // mapping through the plants in the database
      const plants = this.props.plants.map(plant => {
        return (
          <Col key={plant.id} className='card-col' lg={4} md={6}>
            <Card className='card'>
              <div className='button-parent'>
                <Button
                  onClick={this.onDeletePlant(plant)}
                  className='delete-button'
                  variant='outline-dark'
                >
                  x
                </Button>
              </div>
              <Card.Img className='card-img' variant='top' src={plantImage} />
              <Card.Body>
                <Card.Title>
                  <span className='bold'>{plant.name}</span>
                </Card.Title>
                <Card.Text>
                  <span className='bold'>Species: </span>
                  {plant.species}
                </Card.Text>
                <Card.Text>
                  <span className='bold'>Location: </span>
                  {plant.location}
                </Card.Text>
                <Card.Text>
                  <span className='bold'>Description: </span>
                  {plant.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <ListGroup variant='flush'>
                  <ListGroup.Item>{plant.wateringPreference}</ListGroup.Item>
                  <ListGroup.Item>{plant.sunPreference}</ListGroup.Item>
                </ListGroup>
              </Card.Footer>
              <Link to='/newPlant/'>
                <Button className='view-plant-button' variant='outline-dark'>
                  Edit Plant
                </Button>
              </Link>
            </Card>
          </Col>
        );
      });
      return (
        <Container className='card-container'>
          <Row>{plants}</Row>
        </Container>
      );
    }
  }
}
export default ListPlants;
