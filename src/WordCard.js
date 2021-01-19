import React, { Component } from 'react';
import './WordCard.css';

const assassins = ['🔫', '💣', '🔪', '🗡'];
const agents = [
  '🕵🏻‍♀️', '🕵🏼‍♀️', '🕵🏽‍♀️', '🕵🏾‍♀️', '🕵🏿‍♀️',
  '🕵🏻', '🕵🏼', '🕵🏽', '🕵🏾', '🕵🏿',
  '🕵🏻‍♂️', '🕵🏼‍♂️', '🕵🏽‍♂️', '🕵🏾‍♂️', '🕵🏿‍♂️'
];
const bystanders = ['👵🏼', '👨🏽‍🦳', '👨🏻‍🦰', '👨🏾‍💼', '👮🏿‍♂️'];
class WordCard extends Component {
  icon() {
    if (this.props.identity === 'assassin') {
      return assassins[Math.floor(Math.random() * assassins.length)];
    } else if (this.props.identity === 'agent') {
      return agents[Math.floor(Math.random() * agents.length)];
    }
    return '';
  }
  iconEl() {
    if (this.props.identity === 'bystander') { return; }
    return (
      <div className='icon'>
        { this.icon() }
      </div>
    );
  }
  render() {
    return (
      <div className={`WordCard ${this.props.identity}`}>
        { this.iconEl() }
        <div className='word'>
          { this.props.value }
        </div>
      </div>
    );
  }
}

export default WordCard;
