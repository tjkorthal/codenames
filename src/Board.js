import './Board.css'
import WordCard from './WordCard.js';
import IndexCard from './IndexCard.js';

function Board(props) {
  let floatRight = {
    float: 'right'
  };

  let floatLeft = {
    float: 'left'
  };
  return (
    <div>
      <div className="Board" style={floatLeft}>
       {
        props.cards.map((text, index) => <WordCard value={index} text={text}/>)
       }
      </div>
      <div className="Board" style={floatRight}>
        {
          props.identities.map((identity, index) => <IndexCard identity={identity} value={index}/>)
        }
      </div>
    </div>
  );
}

export default Board;
