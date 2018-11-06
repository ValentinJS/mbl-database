import React, { Component } from 'react';

class TableView extends Component {

  onImageError(e) {
    e.target.onerror = null;
    e.target.src = '/images/medium/undefined.jpg';
  }

  render() {
    return (
      <div className="image-view">
        {this.props.cardsData.map((card) => (
          <img
            src={`/images/medium/${card.title}.jpg`}
            alt={card.name}
            onError={this.onImageError}
          />
        ))}
      </div>
    );
  }
}

export default TableView;