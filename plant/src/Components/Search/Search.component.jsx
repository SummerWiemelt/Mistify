// https://www.jondjones.com/frontend/react/components/how-to-build-a-filterable-search-bar-in-react

import React from 'react';

import '../addSearch/addSearch.style.scss';

export default class SearchBar extends React.Component {
    state = {
        initialItems: [],
        items: []
    }

    filterList = (event) => {
      let items = this.state.initialItems;
      items = items.filter((item) => {
        return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({
          initialItems: this.props.content,
          items: this.props.content
      })
    }

    render() {
      return (
        <div className='search-bar'>
          <form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
          </form>
          <div>
            {
                this.state.items.map(function(item) {
                    return <div key={item}>{item}</div>
                })
            }
            </div>
        </div>
      );
    }
};