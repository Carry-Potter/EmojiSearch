import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <input
        type="text"
        placeholder="Search emojis..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div>
        {filteredEmojis.map((emoji) => (
          <span
            key={emoji.title}
            onClick={() => handleEmojiClick(emoji)}
            style={{ cursor: 'pointer', margin: '5px' }}
            title={emoji.title}
          >
            {emoji.symbol}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
