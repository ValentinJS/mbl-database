import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table } from 'reactstrap';
import RawCardsData from './data/cards';
import Navbar from './components/Navbar';
import './index.scss';
import * as serviceWorker from './serviceWorker';

function Card(props) {
  let image = require(`./assets/${props.title}.jpg`);

  return (
    <tr>
      <th scope="row" className={`rarity-${props.rarity}`}>
        <img src={image} alt={props.name} className="card-asset" />
        {props.name}
      </th>
      <td className={`cost-${props.cost}`}>{props.cost}</td>
      <td>{props.atk}</td>
      <td>{props.hp}</td>
      <td>{props.rarityName}</td>
      <td>{props.ability}</td>
    </tr>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'name',
      typeFilter: 'all',
      nameFilter: '',
      costFilter: [0, 7],
      rarityFilter: [0, 4]
    };
    this.handleSort = this.handleSort.bind(this);
    this.handleTypeFilter = this.handleTypeFilter.bind(this);
    this.handleNameFilter = this.handleNameFilter.bind(this);
    this.handleCostFilter = this.handleCostFilter.bind(this);
    this.handleRarityFilter = this.handleRarityFilter.bind(this);
    this.resetFilters = this.resetFilters.bind(this);
  }

  resetFilters() {
    this.setState({
      typeFilter: 'all',
      nameFilter: '',
      costFilter: [0, 7],
      rarityFilter: [0, 4]
    })
  }

  handleTypeFilter(type) {
    this.setState({
      typeFilter: type
    });
  }

  handleNameFilter(event) {
    this.setState({
      nameFilter: event.target.value
    });
  }

  handleCostFilter(event) {
    this.setState({
      costFilter: event.target.value
    });
  }

  handleRarityFilter(event) {
    this.setState({
      rarityFilter: event.target.value
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
          handleTypeFilter={this.handleTypeFilter}
          nameFilter={this.state.nameFilter}
          handleNameFilter={this.handleNameFilter}
          costFilter={this.state.costFilter}
          handleCostFilter={this.handleCostFilter}
          rarityFilter={this.state.rarityFilter}
          handleRarityFilter={this.handleRarityFilter}
          resetFilters={this.resetFilters}
        />
        <Table bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Card Name</th>
              <th>Cost</th>
              <th>ATK</th>
              <th>HP</th>
              <th>Rarity</th>
              <th>Ability</th>
            </tr>
          </thead>
          <tbody>
            {cardsData.map((card, index) => (
              <Card
                key={card.name}
                name={card.name}
                cost={card.cost}
                atk={card.atk}
                hp={card.hp}
                rarityName={card.rarityName}
                rarity={card.rarity}
                ability={card.ability}
                title={card.title}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
