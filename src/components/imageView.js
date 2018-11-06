import React, { Component } from 'react';

class TableView extends Component {
  constructor(props) {
    super(props);

    this.onImageError = this.onImageError.bind(this);
  }

  onImageError(e) {
    e.target.onerror = this.imageFallback;
    e.target.src = e.target.src.replace('medium', 'compact');
    e.target.className = 'small-fallback';
  }

  imageFallback(e) {
    e.target.onerror = null;
    e.target.src = '/images/medium/undefined.jpg';
    e.target.className = '';
  }

  render() {
    return (
      <div className="image-view">
        {this.props.cardsData.map((card) => (
          <img
            key={card.name}
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