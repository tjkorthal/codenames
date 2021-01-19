import React, { Component } from 'react';
import './IndexCard.css';

const assassins = ['🔫', '💣', '🔪', '🗡'];
const agents = [
  '🕵🏻‍♀️', '🕵🏼‍♀️', '🕵🏽‍♀️', '🕵🏾‍♀️', '🕵🏿‍♀️',
  '🕵🏻', '🕵🏼', '🕵🏽', '🕵🏾', '🕵🏿',
  '🕵🏻‍♂️', '🕵🏼‍♂️', '🕵🏽‍♂️', '🕵🏾‍♂️', '🕵🏿‍♂️'
];
const bystanders = ['👵🏼', '👨🏽‍🦳', '👨🏻‍🦰', '👨🏾‍💼', '👮🏿‍♂️'];
class IndexCard extends Component {
  icon() {
    if (this.props.identity === 'assassin') {
      return assassins[Math.floor(Math.random() * assassins.length)];
    } else if (this.props.identity === 'agent') {
      return agents[Math.floor(Math.random() * agents.length)];
    }
    return '';
  }
  render() {
    return (
      <div className={`IndexCard ${this.props.identity}`}>
        { this.icon() }
      </div>
    );
  }
}

export default IndexCard;
