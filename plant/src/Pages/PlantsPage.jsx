import React from "react";

import CardComponent from "../components/plantCard/PlantCard.component";
import AddSearch from '../components/addSearch/AddSearch.component';

import Spinner from "react-bootstrap/Spinner";

class PlantsPage extends React.Component {
  render() {
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if (!this.props.isLoaded) {
      return (
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      );
    }
    console.log(this.props);
    return (
      <div>
        <AddSearch test={this.props.items} />
        <CardComponent plants={this.props.items} />
      </div>
    );
  }
}

export default PlantsPage;
