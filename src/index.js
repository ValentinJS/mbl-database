import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RawCardsData from './data/cards';
import Navbar from './components/Navbar';
import TableView from './components/tableView.js';
import ImageView from './components/imageView.js';
import './index.scss';
import * as serviceWorker from './serviceWorker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'name',
      typeFilter: 'all',
      nameFilter: '',
      costFilter: [0, 7],
      rarityFilter: [0, 4],
      view: true
    };
    this.handleSort = this.handleSort.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
    this.switchView = this.switchView.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  resetFilters() {
    this.setState({
      typeFilter: 'all',
      nameFilter: '',
      costFilter: [0, 7],
      rarityFilter: [0, 4]
    })
  }

  handleFilter(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleSort(sortKey) {
    this.setState({
      sortKey: sortKey
    });
  }

  applySort(data) {
    let sortKey = this.state.sortKey;
    switch (sortKey) {
      case 'name':
        data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]));
        break;
      default:
        data.sort((a,b) => b[sortKey] - a[sortKey]);
    }
    return data;
  }

  applyFilter(data) {
    data = this.applyTypeFilter(data);
    data = this.applyNameFilter(data);
    data = this.applyCostFilter(data);
    data = this.applyRarityFilter(data);
    return data;
  }

  applyTypeFilter(data) {
    let type = this.state.typeFilter;

    switch (type) {
      case 'character':
        data = data.filter(elt => elt.atk !== '--');
        break;
      case 'action':
        data = data.filter(elt => elt.atk === '--');
        break;
      case 'all':
      default:
        // Nothing to do
    }

    return data;
  }

  applyNameFilter(data) {
    let name = this.state.nameFilter;
    return data.filter(card => card.name.toLowerCase().includes(name.toLowerCase()));
  }

  applyRarityFilter(data) {
    let min = this.state.rarityFilter[0];
    let max = this.state.rarityFilter[1];

    return data.filter(card => card.rarity >= min && card.rarity < max);
  }

  applyCostFilter(data) {
    let min = this.state.costFilter[0];
    let max = this.state.costFilter[1];

    return data.filter(card => card.cost >= min && card.cost < max);
  }

  switchView() {
    this.setState({
      view: !this.state.view
    });
  }

  getCardsData() {
    let data = Object.assign([], RawCardsData);

    data = this.applySort(data);
    data = this.applyFilter(data);

    return data;
  }

  render() {
    const cardsData = this.getCardsData();
    return (
      <div>
        <Navbar
          sortKey={this.state.sortKey}
          handleSort={this.handleSort}
          typeFilter={this.state.typeFilter}
          nameFilter={this.state.nameFilter}
          costFilter={this.state.costFilter}
          rarityFilter={this.state.rarityFilter}
          resetFilters={this.resetFilters}
          handleFilter={this.handleFilter}
          switchView={this.switchView}
        />
        {this.state.view ? (
          <TableView cardsData={cardsData} />
        ) : (
          <ImageView cardsData={cardsData} />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
