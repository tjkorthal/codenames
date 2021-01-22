import React, { Component } from 'react';
import WordCard from './WordCard.js';
import './Board.css';

class Board extends Component {
  constructor() {
    super();
    this.createWordCard = this.createWordCard.bind(this);
  }
  createWordCard (word) {
    return (
      <WordCard
        value={ word.value }
        key={ word.value }
        identity1={ word.identity1 }
        identity2={ word.identity2 }
        reveal={ word.reveal }
        gameID={ this.props.gameID }
        player={ this.props.player }
      />
    );
  }
  render () {
    return (
      <div className="Board">
        { this.props.words.map(this.createWordCard) }
      </div>
    );
  }
}

export default Board;
