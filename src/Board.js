import React, { Component } from 'react';
import WordCard from './WordCard.js';
import './Board.css';

class Board extends Component {
  render () {
    return (
      <div>
        <div className="Board">
         {
          this.props.words.map((word) => <WordCard value={ word.value } identity={ word.identity } key={ word.value }/>)
         }
        </div>
      </div>
    );
  }
}

export default Board;
