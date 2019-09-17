import React, { Component } from 'react';

class Cell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visited: false
		};
	}

	render() {
		if (this.props.cellType === 'player') {
			return (
				<div className={`cell ${this.props.cellLayer} player`}>
					<div className='avatar'></div>
				</div>
			);
		} else {
			return (
				<div
					className={`cell ${this.props.cellLayer} ${this.props.cellType}`}></div>
			);
		}
	}
}
export default Cell;
