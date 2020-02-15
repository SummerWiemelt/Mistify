import React from "react";

import ListPlants from "../../components/listPlants/ListPlants";
import AddSearch from "../../components/addSearch/AddSearch.component";

import Spinner from "react-bootstrap/Spinner";

class PlantsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      searchFilter: null
    };
  }

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
    console.log(this.props);
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
    return (
      <div>
        <AddSearch onSearchInputChange={this.onSearchChanged} />
        <ListPlants plants={this.filterResults()} />
      </div>
    );
  }
}

export default PlantsPage;