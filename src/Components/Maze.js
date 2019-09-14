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
				x: 1,
				y: 1
			},
			showModal: true
		};
	}

	checkBoundary = target => {
		// console.log(target);
		// console.log(this.state.playerLocation.x, this.state.playerLocation.y);

		if (target > 12 || target < 1) {
			console.log('out of bounds');
			return false;
		} else {
			console.log('in bounds');
			return true;
		}
	};

	checkTarget = (x, y) => {
		console.log('target x', x);
		console.log('target y', y);

		this.checkTargetCell(x, y);
		if (this.state.mazeMap[y - 1][x - 1] === 0) {
			console.log('path is clear');
			return true;
		} else {
			console.log('path is blocked');
			return false;
		}
	};

	checkTargetCell = (x, y) => {
		const targetCell = this.state.mazeMap[y - 1][x - 1];

		let cellType;
		switch (targetCell) {
			case 0: {
				// added brackets
				cellType = 'path';
				break;
			}
			case 1: {
				// added brackets
				cellType = 'wall';

				break;
			} // added brackets
			case -2:
				{
					cellType = 'win';
					alert('your wish is granted!');
				}

				return cellType;
		}
		console.log(cellType);
		this.setState({
			showModal: true
		});
	};

	// Check if trap, then send player back to start or random location

	moveCoinUp = () => {
		const newY = this.state.playerLocation.y - 1;

		if (this.checkBoundary(newY) === true) {
			this.setState({
				playerLocation: {
					x: this.state.playerLocation.x,
					y: newY
				}
			});

			document
				.querySelector('.player')
				.style.setProperty('grid-row', `${newY}/${newY + 1}`);

			console.log(this.state.playerLocation.x);
		}
	};

	moveCoinDown = y => {
		const newY = this.state.playerLocation.y + 1;

		if (this.checkBoundary(newY) === true) {
			this.setState({
				playerLocation: {
					x: this.state.playerLocation.x,
					y: newY
				}
			});
			document
				.querySelector('.player')
				.style.setProperty('grid-row', `${newY}/${newY + 1}`);
			console.log(this.state.playerLocation.x);
		}
	};

	// };

	moveCoinRight = x => {
		const newX = this.state.playerLocation.x + 1;

		console.log('newX', newX);

		if (
			this.checkBoundary(newX) === true &&
			this.checkTarget(newX, this.state.playerLocation.y)
		) {
			this.setState({
				playerLocation: {
					x: newX,
					y: this.state.playerLocation.y
				}
			});
			document
				.querySelector('.player')
				.style.setProperty('grid-column', `${newX}/${newX + 1}`);
			console.log(this.state.playerLocation.x);
		}
	};

	moveCoinLeft = x => {
		console.log(this.state.playerLocation.x);
		console.log(this.state.playerLocation.y);

		const newX = this.state.playerLocation.x - 1;
		if (this.checkBoundary(newX) === true) {
			this.setState({
				playerLocation: {
					x: newX,
					y: this.state.playerLocation.y
				}
			});
			document
				.querySelector('.player')
				.style.setProperty('grid-column', `${newX}/${newX + 1}`);
			console.log(this.state.playerLocation.x);
		}
	};

// moveCoin = (axis, direction)=>{
	
// }


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
									return <div className='movingCell player'>Player</div>;
								} else {
									return <div className='movingCell'>O</div>;
								}
							});
						})}
					</div>
				</div>
				<button onClick={this.moveCoinLeft}>Left</button>
				<button onClick={this.moveCoinUp}>Up</button>
				<button onClick={this.moveCoinRight}>Right</button>
				<button onClick={this.moveCoinDown}>Down</button>

				{this.state.showModal ? <WinModal /> : null}
				{/* modal appears if victory condition is set to true*/}
			</div>
		);
	}
}

export default Maze;
