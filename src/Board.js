import './Board.css'
import WordCard from './WordCard.js';

function Board(props) {
  return (
    <div className="Board">
     {
      props.cards.map((text, index) => <WordCard value={index}text={text}/>)
     }
    </div>
  );
}

export default Board;
