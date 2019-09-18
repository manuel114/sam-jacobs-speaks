import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class WinModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fliped: false
		};
	}

	//start listening to keydown event
	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress, false);
	}
	//stop listening to keydown event
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress, false);
	}

	flipCard = () => {
		this.setState({
			fliped: true
		});
	};

	handleKeyPress = e => {
		//press Enter or space key to flip the card
		//for keyboard accesibility
		if (e.key === 'Enter' || e.key === ' ') {
			this.flipCard();
		}
	};

	render() {
		return (
			<div className='winModalOverlay' onKeyPress={this.handleKeyPress}>
				<div className='winModalSub'>
					<div className='card' onClick={this.flipCard}>
						<div className={`front ${this.state.fliped ? 'flipFront' : ''}`}>
							<h2 className='cardTitle'>your wish is granted</h2>
						</div>
						x
						<div className={`back ${this.state.fliped ? 'flipBack' : ''}`}>
							<p className='modalWish'>
								<span>{this.props.finalAnswer}</span>
							</p>

							<Link to='/'>
								<button
									className='newWishButton'
									onClick={this.props.getRandomQuote}>
									Wish Again?
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default WinModal;
