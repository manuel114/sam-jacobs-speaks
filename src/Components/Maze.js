import React, { Component } from 'react';
import WinModal from './WinModal';

class Maze extends Component {
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
				x: 0,
				y: 0
			},
			showModal: true
		};
	}

	// on click/keydown, get target location x, y, store in target state

	// check if target cell is within boundary:

	// if yes, check type of target cell

	// if path, move(), updates this.state.playerLocation

	// if wall, null

	// if exit, Link to modal box

	// if trap, trap()

	// if no, null

	//pass in X or Y axis, and +1 or -1 movement
	updateCoinLocation = (axis, vector) => {
		console.log(vector);
		console.log(this.state.playerLocation);

		const target = this.state.playerLocation;

		target[axis] = this.state.playerLocation[axis] + vector;
		// this is where it's counting

		if (
			target[axis] + vector < 0 ||
			target[axis] + vector > this.state.mazeMap.length
		) {
			console.log('out of bounds');
		} else {
			console.log('in bounds');
			this.checkTargetCell(target, axis, vector);
		}
	};

	checkTargetCell = (target, axis, vector) => {
		const targetCellValue = this.state.mazeMap[target.y][target.x];

		console.log('check target cell,', target.x, target.y);
		console.log('targetCellValue', targetCellValue);
		switch (targetCellValue) {
			case 1: {
				console.log('wall!!!!!');
				console.log(
					'player location when wall is hit',
					this.state.playerLocation
				);

				console.log('before target', target);
				target[axis] = this.state.playerLocation[axis] + vector * -1;
				console.log('after target', target);

				// const newPlayerLocation = this.state.playerLocation;

				// newPlayerLocation[axis] += vector * -1;

				// this.setState({
				// 	playerLocation: newPlayerLocation
				// });

				break;
			}
			case -2: {
				this.moveCoin(target);
				alert('your wish is granted!');
				break;
			}
			case 0: {
				this.moveCoin(target);

				break;
			}
		}
	};

	moveCoin = target => {
		console.log('move coin', target);

		this.setState({ playerLocation: target }, () => {
			console.log('player location changed');
			document.querySelector(
				'.player'
			).style.transform = `translate(${target.x}00%,${target.y}00%)`;
		});
	};

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
}

export default Maze;
