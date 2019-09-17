import React, { Component } from 'react';
import WinModal from './WinModal';
import Cell from './Cell';

class Maze extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mazeMap: [
				[-1, -2, 1, -3, 0, 0, 0, 0, 1, 0, 0, -6],
				[0, -4, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
				[1, -5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
				[1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
				[-6, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
				[0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
				[0, 1, 0, 0, 0, 1, 0, 0, 1, -2, 1, 0],
				[0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
				[0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
				[0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
				[0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0]
			],
			playerLocation: {
				x: 1,
				y: 1
			},
			showModal: false,
			spin: false,
			coinSize: 'regular',
			reverseControl: false,
			dPad: 'show'
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
			//if target cell is a portal
			if (targetCellValue === -6) {
				//after 0.3s, send back to the starting point
				setTimeout(() => {
					this.moveCoin({ x: 1, y: 1 }, 2);
				}, 300);
			}
		}

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
		}
	};

	moveCoin = (target, time) => {
		document.querySelector('.player').style.transform = `translate(${target.x -
			1}00%,${target.y - 1}00%)`;
		document.querySelector('.player').style.transition = `transform ${time}s`;
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
							switch (cell) {
								case 1: {
									return <Cell cellLayer='mapCell' cellType='wall' />;
									break;
								}

								case 0: {
									return <Cell cellLayer='mapCell' cellType='path' />;
									break;
								}

								case -1: {
									return <Cell cellLayer='mapCell' cellType='path' />;
									break;
								}

								case -2: {
									return <Cell cellLayer='mapCell' cellType='exit' />;
									break;
								}

								case -3: {
									return <Cell cellLayer='mapCell' cellType='oil' />;
									break;
								}

								case -4: {
									return <Cell cellLayer='mapCell' cellType='mushroom' />;
									break;
								}

								case -5: {
									return <Cell cellLayer='mapCell' cellType='reverse' />;
									break;
								}
								case -6: {
									return <Cell cellLayer='mapCell' cellType='portal' />;
									break;
								}
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
				<div className={`dPad ${this.state.dPad}DPad`}>
					<button
						className='dPadButton dPadLeft'
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('x', -1);
							} else {
								this.updateCoinLocation('x', 1);
							}
						}}>
						<span className='visuallyHidden'>left</span>
					</button>
					<button
						className='dPadButton dPadUp'
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('y', -1);
							} else {
								this.updateCoinLocation('y', 1);
							}
						}}>
						<span className='visuallyHidden'>up</span>
					</button>
					<button
						className='dPadButton dPadRight'
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('x', 1);
							} else {
								this.updateCoinLocation('x', -1);
							}
						}}>
						<span className='visuallyHidden'>right</span>
					</button>
					<button
						className='dPadButton dPadDown'
						onClick={() => {
							if (this.state.reverseControl === false) {
								this.updateCoinLocation('y', 1);
							} else {
								this.updateCoinLocation('y', -1);
							}
						}}>
						<span className='visuallyHidden'>down</span>
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
