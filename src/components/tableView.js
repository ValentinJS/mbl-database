import React, { Component } from 'react';
import { Table, Modal } from 'reactstrap';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.onMediumError = this.onMediumError.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onCompactError(e) {
    e.target.onerror = null;
    e.target.src = '/images/compact/undefined.jpg';
  }

  onMediumError(e) {
    e.target.onerror = this.onCompactError;
    console.log(e.target.src);
    e.target.src = e.target.src.replace('medium', 'compact');
  }

  render() {
    let card = this.props.card;
    let image = `/images/compact/${card.title}.jpg`;
    let bigImage = `/images/medium/${card.title}.jpg`;

    return (
      <tr>
        <th scope="row" className={`rarity-${card.rarity}`}>
          <img
            src={image}
            alt={card.name}
            onClick={this.toggle}
            onError={this.onCompactError}
            className="card-asset"
          />
          {card.name}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="custom-modal">
            <img
              src={bigImage}
              alt={card.name}
              onError={this.onMediumError}
              className="card-modal"
            />
          </Modal>
        </th>
        <td className={`cost-${card.cost}`}>{card.cost}</td>
        <td>{card.atk}</td>
        <td>{card.hp}</td>
        <td>{card.rarityName}</td>
        <td>{card.ability}</td>
      </tr>
    );
  }
}

class TableView extends Component {

  render() {
    return (
      <Table bordered hover responsive size="sm" className="card-table">
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
        {this.props.cardsData.map((card) => (
          <Card
            card={card}
            key={card.name}
          />
        ))}
      </tbody>
    </Table>
    );
  }
}

export default TableView;