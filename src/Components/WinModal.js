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

	getDynamicFontSize = (text) => {
		if (!text) return '16px';
		
		const length = text.length;
		
		// Very long responses (300+ characters)
		if (length > 300) return '12px';
		
		// Long responses (200-300 characters)
		if (length > 200) return '14px';
		
		// Medium responses (100-200 characters)
		if (length > 100) return '15px';
		
		// Short responses (default)
		return '16px';
	};



	render() {
		return (
			<div className='winModalOverlay' onKeyPress={this.handleKeyPress}>
				<div className='winModalSub'>
					<div className='card' onClick={this.flipCard}>
						<div className={`front ${this.state.fliped ? 'flipFront' : ''}`}>
							<h2 className='cardTitle'>Sam has spoken</h2>
						</div>
						x
						<div className={`back ${this.state.fliped ? 'flipBack' : ''}`}>
							{this.props.userQuestion && (
								<p className='user-question'>
									<span className='question-label'>Your Question:</span>
									<span className='question-text'>"{this.props.userQuestion}"</span>
								</p>
							)}
							<p className='modalWish'>
								{this.props.isLoading ? (
									<span className='advice-quote'>Sam is thinking...</span>
								) : (
									<span 
										className='advice-quote'
										style={{
											fontSize: this.getDynamicFontSize(this.props.finalAnswer)
										}}
									>
										{this.props.finalAnswer}
									</span>
								)}
							</p>
							<p className='advice-footer'>The future is in your hands. What will you do about it?</p>

							<Link to='/'>
								<button
									className='newWishButton'
									onClick={this.props.getRandomQuote}>
									Ask Again?
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
