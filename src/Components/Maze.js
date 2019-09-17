import React, { Component } from 'react';
import WinModal from './WinModal';
import Cell from './Cell';

class Maze extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mazeMap: [
				[-1, 0, 1, -3, 0, 0, 0, 0, 1, 0, 0, -6],
				[0, -4, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
				[1, -5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				[1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
				[1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
				[1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
				[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
				[1, 0, 0, 0, 0, 1, 0, 0, 1, -2, 1, 0],
				[1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
				[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
				[1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0],
				[1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0]
			],
			playerLocation: {
				x: 1,
				y: 1
			},
			showModal: false,
			spin: false,
			coinSize: 'regular',
			reverseControl: false
		};
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress, false);
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress, false);
	}
	updateCoinLocation = (axis, vector) => {
		if (
			this.state.playerLocation[axis] + vector > 0 &&
			this.state.playerLocation[axis] + vector <= this.state.mazeMap.length
		) {
			this.checkTargetCell(this.state.playerLocation, axis, vector);
		}
	};

	checkTargetCell = (playerLocation, axis, vector) => {
		const target = {
			x: playerLocation.x,
			y: playerLocation.y
		};
		target[axis] += vector;
		const targetCellValue = this.state.mazeMap[target.y - 1][target.x - 1];
		if (targetCellValue !== 1) {
			this.moveCoin(target);
		}
		switch (targetCellValue) {
			//exit of maze
			case -2: {
				this.setState({
					showModal: true,
					spin: 'noSpin'
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
			//send coin to starting point
			case -6: {
				this.moveCoin({ x: 1, y: 1 });
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
							if (cell !== 1) {
								return <Cell cellLayer='mapCell' cellType='path' />;
							} else {
								return <Cell cellLayer='mapCell' cellType='wall' />;
							}
						});
					})}
					<div className='movingLayer'>
						{this.state.mazeMap.map((row, Y) => {
							return row.map((cell, X) => {
								if (cell === -1) {
									// starting location
									return (
										<Cell
											cellLayer='movingCell'
											cellType='player'
											size={this.state.coinSize}
										/>
									);
								} else {
									return <Cell cellLayer='movingCell' cellType='fog' />;
								}
							});
						})}
					</div>
				</div>
				<div className='controller'>
					<button
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('x', -1);
							} else {
								this.updateCoinLocation('x', 1);
							}
						}}>
						Left
					</button>
					<button
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('y', -1);
							} else {
								this.updateCoinLocation('y', 1);
							}
						}}>
						Up
					</button>
					<button
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('x', 1);
							} else {
								this.updateCoinLocation('x', -1);
							}
						}}>
						Right
					</button>
					<button
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('y', 1);
							} else {
								this.updateCoinLocation('y', -1);
							}
						}}>
						Down
					</button>
				</div>

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
