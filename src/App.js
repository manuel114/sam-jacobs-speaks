import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      maze: [
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1]
      ]
    };
  }

  render() {
    return (
      <div className='App'>
        <h1>Zoltar Speaks</h1>
        <div className='maze'>
          {this.state.maze.map((item, index) => {
            return item.map((cell, i) => {
              if (cell === 0) {
                return <div className='cell path'>path</div>;
              } else {
                return <div className='cell wall'>wall</div>;
              }
            });
          })}
        </div>
      </div>
    );
  }
}

export default App;
