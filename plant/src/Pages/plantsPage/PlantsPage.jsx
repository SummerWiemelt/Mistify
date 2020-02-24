import React from "react";

import ListPlants from "../../components/listPlants/ListPlants";
import AddSearch from "../../components/addSearch/AddSearch.component";

import Spinner from "react-bootstrap/Spinner";

import { getAllPlants } from "../../services/PlantApp.service";
import firebase from "firebase";


// combines AddSearch and ListPlants in order to search the plants 


class PlantsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchFilter: null
    };
  }

  componentDidMount() {
    getAllPlants();
  }

  // Search
  onSearchChanged = inputEvent => {
    this.setState({
      searchFilter: inputEvent.target.value.toLowerCase()
    });
  };
  filterResults = () => {
    if (this.state.searchFilter && this.state.searchFilter.length > 0) {
      let matchedPlants = [];
      for (let i = 0; i < this.props.items.length; i++) {
        if (
          this.props.items[i].name.toLowerCase().includes(this.state.searchFilter)
        ) {
          matchedPlants.push(this.props.items[i]);
        }
      }
      return matchedPlants;
    } else {
      return this.props.items;
    }
  };

  render() {
    let loadContent = () => {
      // error if failed 
      if (this.props.error) {
        return <div>{this.props.error}</div>;
      }
      // spin while loading
      if (!this.props.isLoaded) {
        return (
          <Spinner variant='secondary' animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        );
      } else {
        //return the list of plants with the filtered results 
        return <ListPlants plants={this.filterResults()} />;
      }
    };
    return (
      <div>
        <AddSearch onSearchInputChange={this.onSearchChanged} />
        {loadContent()}
      </div>
    );
  }
}

export default PlantsPage;
