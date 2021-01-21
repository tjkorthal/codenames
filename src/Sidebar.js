import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  title() {
    if (!this.props.gameID) { return; }

    if (this.props.gameStatus === 'in progress') {
      return this.whoseTurn()
    } else {
      return this.props.gameStatus
    }
  }
  whoseTurn () {
    if (this.props.playerTurn === this.props.player) {
      return 'Your turn'
    } else {
      return "Other player's turn"
    }
  }
  render () {
    return (
      <div className="Sidebar">
        <h2 className="title">{ this.title() }</h2>
      </div>
    );
  }
}

export default Sidebar;
