import React, { Component } from 'react';
import './Board.css';
import WordCard from './WordCard.js';
import IndexCard from './IndexCard.js';

let floatRight = {
  float: 'right'
};

let floatLeft = {
  float: 'left'
};
class Board extends Component {
  render () {
    return (
      <div>
        <div className="Board" style={floatLeft}>
         {
          this.props.cards.map((text, index) => <WordCard value={index} text={text}/>)
         }
        </div>
        <div className="Board" style={floatRight}>
          {
            this.props.identities.map((identity, index) => <IndexCard identity={identity} value={index}/>)
          }
        </div>
      </div>
    );
  }
}

export default Board;
