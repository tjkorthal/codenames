import './App.css';
import Board from './Board.js';

const words = [
  'night',
  'arrival',
  'blood',
  'cousin',
  'boyfriend',
  'climate',
  'country',
  'oasis',
  'procedure',
  'pizza',
  'media',
  'fortune',
  'mall',
  'injury',
  'bread',
  'disease',
  'writer',
  'diamond',
  'guitar',
  'assistant',
  'football',
  'student',
  'midnight',
  'uncle',
  'ear'
];

const identities = [
  'assassin', 'assassin', 'assassin',
  'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent', 'agent',
  'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander', 'bystander'
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 class='title'>Codenames</h1>
        <Board cards={words.sort(() => Math.random() - 0.5)}
          identities={identities.sort(() => Math.random() - 0.5)}
        />
        <button>Create New Game</button>
        <button>Join Game</button>
      </header>
    </div>
  );
}

export default App;
