constructor(props) {
  super(props);
  this.state = {
    mazeMap: [
      [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, -2]
    ],
    playerLocation: {
      x: 1,
      y: 1
    },
    showModal: true
  };
}

//pass in X or Y axis, and +1 or -1 movement
updateCoinLocation = (axis, vector) => {
  console.log(vector);
  console.log(this.state.playerLocation);

  // this is where it's counting

  if (
    this.state.playerLocation[axis] + vector <= 0 ||
    this.state.playerLocation[axis] + vector > this.state.mazeMap.length
  ) {
    console.log('out of bounds');
  } else {
    console.log('in bounds');
    this.checkTargetCell(this.state.playerLocation, axis, vector);
  }
  console.log('this.state.playerLocation', this.state.playerLocation);
};

checkTargetCell = (playerLocation, axis, vector) => {
  const target = {
    x: playerLocation.x,
    y: playerLocation.y
  };

  // const target = this.state.playerLocation;

  target[axis] += vector;

  const targetCellValue = this.state.mazeMap[target.y - 1][target.x - 1];

  // console.log('check target cell x, y', target.x, target.y);
  console.log('target', target);
  console.log('targetCellValue', targetCellValue);
  switch (targetCellValue) {
    case -1: {
      this.moveCoin(target);
    }
    case 1: {
      console.log('wall');

      break;
    }
    case -2: {
      // const target = playerLocation;

      this.moveCoin(target);
      alert('your wish is granted!');
      break;
    }
    case 0: {
      // const target = playerLocation;

      this.moveCoin(target);

      break;
    }
  }
};

moveCoin = target => {
  console.log('move coin', target);

  console.log('player location changed');
  document.querySelector('.player').style.transform = `translate(${target.x -
    1}00%,${target.y - 1}00%)`;
  this.setState({ playerLocation: target });
};

// 	document.querySelector(
// 					'.player'
// 				).style.transform = `translate(${target.x}00%,${target.y}00%)`;

// 				this.setState({
// 					playerLocation:attempPlayerLocation
// 				})

// }

render() {
  return (
    <div>
      <h1>Maze</h1>
      <div className='mazeLayer'>
        {this.state.mazeMap.map((row, Y) => {
          return row.map((cell, X) => {
            if (cell !== 1) {
              return <div className='mapCell path'>path</div>;
            } else {
              return <div className='mapCell wall'>wall</div>;
            }
          });
        })}

        <div className='movingLayer'>
          {this.state.mazeMap.map((row, Y) => {
            return row.map((cell, X) => {
              if (cell === -1) {
                // starting location
                return (
                  <div className='movingCell player'>
                    <div className='avatar'></div>
                  </div>
                );
              } else {
                return <div className='movingCell'>O</div>;
              }
            });
          })}
        </div>
      </div>
      <button
        onClick={() => {
          this.updateCoinLocation('x', -1);
        }}>
        Left
				</button>
      <button
        onClick={() => {
          this.updateCoinLocation('y', -1);
        }}>
        Up
				</button>
      <button
        onClick={() => {
          this.updateCoinLocation('x', 1);
        }}>
        Right
				</button>
      <button
        onClick={() => {
          this.updateCoinLocation('y', 1);
        }}>
        Down
				</button>

      {this.state.showModal ? <WinModal /> : null}
      {/* modal appears if victory condition is set to true*/}
    </div>
  );
}


export default Maze;