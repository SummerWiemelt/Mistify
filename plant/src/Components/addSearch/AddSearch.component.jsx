// connect search to plant names

import React from "react";

import "./addSearch.style.scss";

import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class AddSearch extends React.Component {
  render() {
    return (
      <Nav className='addsearch-nav'>
        <Link to='/newPlant'>
          <Button variant='light' size='lg'>
            Add New Plant +
          </Button>
        </Link>
        <input
          type='text'
          placeholder='Search plant name'
          onChange={this.props.onSearchInputChange}
        />
      </Nav>
    );
  }
}

export default AddSearch;
