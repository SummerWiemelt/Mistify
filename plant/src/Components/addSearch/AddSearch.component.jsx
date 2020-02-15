// connect search to plant names

import React from 'react';

import './addSearch.style.scss';
import SearchBar from '../Search/Search.component';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

class AddSearch extends React.Component {
  render() {
    const test = ['1'];
    return (
        <Nav className='AddSearch-nav'>
          <Link to='/newPlant'>
            <Button variant='light' size='lg'>Add New Plant +</Button>
          </Link>
          <SearchBar className='search-bar' content={test} />
        </Nav>
    );
  }
}

export default AddSearch;
