import './IndexCard.css';

function IndexCard(props) {
  const assassins = ['🔫', '💣', '🔪', '🗡'];
  const agents = [
    '🕵🏻‍♀️', '🕵🏼‍♀️', '🕵🏽‍♀️', '🕵🏾‍♀️', '🕵🏿‍♀️',
    '🕵🏻', '🕵🏼', '🕵🏽', '🕵🏾', '🕵🏿',
    '🕵🏻‍♂️', '🕵🏼‍♂️', '🕵🏽‍♂️', '🕵🏾‍♂️', '🕵🏿‍♂️'
  ];
  const bystanders = ['👵🏼', '👨🏽‍🦳', '👨🏻‍🦰', '👨🏾‍💼', '👮🏿‍♂️'];

  let icon;
  if (props.identity === 'assassin') {
    icon = assassins[Math.floor(Math.random() * assassins.length)];
  } else if (props.identity === 'agent') {
    icon = agents[Math.floor(Math.random() * agents.length)];
  }
  return (
    <div className={`IndexCard ${props.identity}`}>
      { icon }
    </div>
  );
}

export default IndexCard;
