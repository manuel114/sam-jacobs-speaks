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
				x: 0,
				y: 0
			}
		};
	}

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
			</div>
		);
	}
}

export default Maze;
