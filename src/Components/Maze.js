import React, { Component } from 'react';

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
				[1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0]
			],
			playerLocation: {
				x: 1,
				y: 1
			}
		};
	}

	checkBoundary = (target) => {
		console.log(target);
		console.log(this.state.playerLocation.x,this.state.playerLocation.y);
		if (target > 12 || target < 1){
			console.log("out of bounds");
			return false;
		}else {
			console.log("in bounds");
			return true;
		}
	}

	
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

	}
		
	

	moveCoinDown = y => {

		const newY = this.state.playerLocation.y + 1;

		if (this.checkBoundary(newY) === true) {

			this.setState({
			playerLocation: {
				x: this.state.playerLocation.x,
				y: newY
			}
		})
		document
			.querySelector('.player')
			.style.setProperty('grid-row', `${newY}/${newY + 1}`);
		console.log(this.state.playerLocation.x);

		}}
		
	// };

	moveCoinRight = x => {
		const newX = this.state.playerLocation.x + 1;
		
		if (this.checkBoundary(newX) === true) {
			this.setState({
			playerLocation: {
				x: newX,
				y: this.state.playerLocation.y
			}
		})
		document
			.querySelector('.player')
			.style.setProperty('grid-column', `${newX}/${newX + 1}`);
		console.log(this.state.playerLocation.x);
		}}
	
	// }

	moveCoinLeft = x => {
		const newX = this.state.playerLocation.x - 1;
		if (this.checkBoundary(newX) === true) {
this.setState({
			playerLocation: {
				x: newX,
				y: this.state.playerLocation.y
			}
		})
		document
			.querySelector('.player')
			.style.setProperty('grid-column', `${newX}/${newX + 1}`);
		console.log(this.state.playerLocation.x);
		}
	}
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
			</div>
		);
	}
}

export default Maze;
