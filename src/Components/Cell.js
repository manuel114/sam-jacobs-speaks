import React, { Component } from 'react';

const Cell = ({ cellType, cellLayer, size }) => {
	if (cellType === 'player') {
		return (
			<div className={`cell ${cellLayer} player`}>
				<div className={`coin ${size}`}></div>
			</div>
		);
	} else {
		return <div className={`cell ${cellLayer} ${cellType}`}></div>;
	}
};

export default Cell;
