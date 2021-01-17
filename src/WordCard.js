import './WordCard.css'

function WordCard(props) {
  return (
    <div className="WordCard">
      { props.text }
    </div>
  );
}

export default WordCard;
