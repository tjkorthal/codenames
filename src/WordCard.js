import React, { Component } from 'react';
import './WordCard.css';

class WordCard extends Component {
  render() {
    return (
      <div className="WordCard">
        { this.props.text }
      </div>
    );
  }
}

export default WordCard;
