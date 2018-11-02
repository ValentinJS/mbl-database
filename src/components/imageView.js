import React, { Component } from 'react';

class TableView extends Component {

  getImage(title, name) {
    let image;
    try {
      image = require(`../assets/medium/${title}.jpg`);
    } catch {
      image = require(`../assets/medium/undefined.jpg`)
      console.log('Oh no, missing big image for ' + name);
    }
    return image;
  }

  render() {

    return (
      <div className="image-view">
        {this.props.cardsData.map((card) => (
          <img src={this.getImage(card.title, card.name)} alt={card.name} />
        ))}
      </div>

    );
  }
}

export default TableView;