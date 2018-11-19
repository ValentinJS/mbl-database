import React, { Component } from 'react';

class TableView extends Component {

  getImageSrc(card) {
    if (card.images.medium) {
      return `/images/medium/${card.title}.jpg`;
    } else if (card.images.compact) {
      return `/images/compact/${card.title}.jpg`;
    } else {
      return '/images/medium/undefined.jpg';
    }
  }

  render() {
    return (
      <div className="image-view">
        {this.props.cardsData.map((card) => (
          <img
            key={card.name}
            src={this.getImageSrc(card)}
            alt={card.name}
            className={!card.images.medium && card.images.compact ? 'small-fallback' : ''}
          />
        ))}
      </div>
    );
  }
}

export default TableView;