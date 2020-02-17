import React from "react";

import "./plantCard.style.scss";
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
  onDeletePlant = plant => () => {
    deletePlant(plant.id);
  };

  render() {
    console.log("test");
    if (this.props) {
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
                  <ListGroup.Item>{plant.waterPreference}</ListGroup.Item>
                  <ListGroup.Item>{plant.sunPreference}</ListGroup.Item>
                </ListGroup>
              </Card.Footer>
              <Link to='/viewPlant'>
                <Button className='view-plant-button' variant='outline-dark'>
                  View Plant
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
