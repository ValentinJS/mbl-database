import React, { Component } from 'react';
import { Table, Modal } from 'reactstrap';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getCompactImg(card) {
    if (card.images.compact) {
      return `/images/compact/${card.title}.jpg`;
    }
    return '/images/compact/undefined.jpg';
  }

  getMediumImg(card) {
    if (card.images.medium) {
      return `/images/medium/${card.title}.jpg`;
    }
    return this.getCompactImg(card);
  }

  render() {
    let card = this.props.card;

    return (
      <tr>
        <th scope="row" className={`rarity-${card.rarity}`}>
          <img
            src={this.getCompactImg(card)}
            alt={card.name}
            onClick={this.toggle}
            className="card-asset"
          />
          {card.name}
          <Modal isOpen={this.state.modal} toggle={this.toggle} className="custom-modal">
            <img
              src={this.getMediumImg(card)}
              alt={card.name}
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