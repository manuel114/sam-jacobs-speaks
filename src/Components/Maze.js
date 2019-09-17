import React, { Component } from 'react';
import Cell from './Cell';
import WinModal from './WinModal';
import DPad from './DPad';

class Maze extends Component {
	constructor(props) {
		super(props);
		this.state = {
      mazeMap: [
        [-1, 1, -7, 1, 0, 0, 0, 0, 0, 0, 0, -4],
        [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0],
        [-3, 1, 0, 0, 0, 1, -3, 1, 0, 1, -5, 0],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, -6, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, -6, 1, -2, 0, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, -4, 1, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      playerLocation: {
        x: 1,
        y: 1
      },
      showModal: false,
      spin: false,
      coinSize: "regular",
      reverseControl: false,
      dPad: "show"
    };
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress, false);
	}

	
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress, false);
	}

	updateCoinLocation = (axis, vector) => {
		//create a shallow copy of current player location
		const target = Object.assign({}, this.state.playerLocation);
		//set target location according to the axis and vector passed in
		target[axis] += vector;

		//make sure the target cell is within maze boundary
		if (target[axis] > 0 && target[axis] <= this.state.mazeMap.length) {
			//pass the target to the next step
			this.checkTargetCell(target);
		}
	};

	checkTargetCell = target => {
		//use target location x and y as indexes to access maze array and element value
		const targetCellValue = this.state.mazeMap[target.y - 1][target.x - 1];
		//if target cell is not a wall
		if (targetCellValue !== 1) {
			this.moveCoin(target, 0.3);
			setTimeout(() => {this.removeItem(target)}, 300)
			switch (targetCellValue) {
				//exit of maze
				case -2: {
					this.setState({
						showModal: true,
						spin: 'noSpin',
						dPad: 'hide'
					});
					break;
				}
				//spin the maze
				case -3: {
					this.setState({ spin: 'spin' });
					break;
				}
	
				//grow the coin
				case -4: {
					this.setState({ coinSize: 'big' });
					break;
				}
				//reverse the controls
				case -5: {
					this.setState({ reverseControl: true });
					break;
				}
				case -6: {
					setTimeout(() => {this.moveCoin({ x: 1, y: 1 }, 2)}, 300);
					break;
				}
				case -7: {
					setTimeout(() => {this.moveCoin({ x: 12, y: 3 }, 2)}, 300);
					break;
				}
			}	
		}

		
	};

	moveCoin = (target, time) => {
		document.querySelector('.player').style.transform = `translate(${target.x -
			1}00%,${target.y - 1}00%)`;
		document.querySelector('.player').style.transition = `transform ${time}s`;
		this.setState({ playerLocation: target });
	};
	removeItem=(target)=>{
		
			const newMazeMap = this.state.mazeMap;
			newMazeMap[target.y - 1][target.x - 1] = 0;
			this.setState({mazeMap:newMazeMap})
		
	}

	
	handleKeyPress = e => {
		if (this.state.reverseControl === true) {
			switch (e.key) {
				case 'ArrowUp': {
					this.updateCoinLocation('y', 1);
					break;
				}
				case 'ArrowDown': {
					this.updateCoinLocation('y', -1);
					break;
				}
				case 'ArrowLeft': {
					this.updateCoinLocation('x', 1);
					break;
				}
				case 'ArrowRight': {
					this.updateCoinLocation('x', -1);
					break;
				}
			}
		} else {
			switch (e.key) {
				case 'ArrowUp': {
					this.updateCoinLocation('y', -1);
					break;
				}
				case 'ArrowDown': {
					this.updateCoinLocation('y', 1);
					break;
				}
				case 'ArrowLeft': {
					this.updateCoinLocation('x', -1);
					break;
				}
				case 'ArrowRight': {
					this.updateCoinLocation('x', 1);
					break;
				}
			}
		}
	};
	render() {
		return (
			<main className='mazeContainer' onKeyPress={this.handleKeyPress}>
				<div className={`mazeLayer ${this.state.spin}`}>
					{this.state.mazeMap.map((row, Y) => {
						return row.map((cell, X) => {
								
							switch (cell) {
								case 1: {
									return <Cell cellLayer='mapCell' cellType='wall' key={`mapCell-${X}-${Y}`} />;
									break;
								}
								case -1: {
									return <Cell cellLayer='mapCell' cellType='path'key={`mapCell-${X}-${Y}`}/>;
									break;
								}

								case -2: {
									return <Cell cellLayer='mapCell' cellType='exit' key={`mapCell-${X}-${Y}`} />;
									break;
								}

								case -3: {
									return <Cell cellLayer='mapCell' cellType='oil'key={`mapCell-${X}-${Y}`}/>;
									break;
								}

								case -4: {
									return <Cell cellLayer='mapCell' cellType='mushroom'key={`mapCell-${X}-${Y}`} />;
									break;
								}

								case -5: {
									return <Cell cellLayer='mapCell' cellType='reverse'key={`mapCell-${X}-${Y}`}  />;
									break;
								}
								case -6: {
									return <Cell cellLayer='mapCell' cellType='portal'key={`mapCell-${X}-${Y}`}/>;
									break;
								}
								case -7:{
									return <Cell cellLayer='mapCell' cellType='portal'key={`mapCell-${X}-${Y}`}/>;
									break;
								}
								default:
									return <Cell cellLayer='mapCell' cellType='path' key={`mapCell-${X}-${Y}`} />;
									
								

							}
						});
					})}
					<div className='movingLayer'>
						{this.state.mazeMap.map((row, Y) => {
							return row.map((cell,X) => {
								if (cell === -1) {
									// starting location
									return (
										<Cell
											cellLayer='movingCell'
											cellType='player'
											size={this.state.coinSize}
											key='player'
										/>
									);
								} else {
									return <Cell cellLayer='movingCell' cellType='fog' key={`movingCell-${X}-${Y}`} />;
								}
							});
						})}
					</div>
				</div>

				<DPad showStatus={this.state.dPad}/>
				{this.state.showModal ? (
					<WinModal
						finalAnswer={this.props.finalAnswer}
						getRandomQuote={this.props.getRandomQuote}
					/>
				) : null}
				{/* modal appears if victory condition is set to true */}
			</main>
		);
	}
}
export default Maze;
