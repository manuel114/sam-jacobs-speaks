import React, { Component } from 'react';
import axios from 'axios';
import filterWish from './filterWish';
import './Partials/App.scss';
import Maze from './Components/Maze';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = {
			advice: ''
		};
	}

	handleSubmit = userWish => {
		const userInput = userWish;
		///run the imported filterWish function to remove filler words
		const filteredWish = filterWish(userInput);

		// turn the words into an array
		const wordArray = filteredWish.split(' ');

		// take the first word of the array and save it
		const userKeyWord = wordArray[0];

		// run it through the API Call to get contextual advice
		axios({
			url: `https://api.adviceslip.com/advice/search/${userKeyWord}`,
			method: `GET`,
			dataResponse: `json`
		}).then(answer => {
			if (typeof answer.data.message === 'undefined') {
				this.setState({
					advice: answer.data.slips[0].advice
				});
			}
		});
	};

	componentDidMount() {
		// on mount, make an API call, get a random piece of advice and store in state, just in case the user's keyword query doesn't return any result
		this.getRandomQuote();
	}
	getRandomQuote = () => {
		axios({
			url: `https://api.adviceslip.com/advice`,
			method: `GET`,
			dataResponse: `json`
		})
			.then(answer => {
				const randomAdvice = answer.data.slip.advice;
				this.setState({
					advice: randomAdvice
				});
			})
			.catch(() => {
				// if ajax call for random advice failed (API down) return this error message
				this.setState({
					advice: `Zoltar is resting and can't offer advice. Try again later.`
				});
			});
	};

	render() {
		return (
			<Router>
				<div className='app'>
					<Route
						exact
						path='/'
						component={() => (
							<LandingPage
								handleSubmit={this.handleSubmit}
								wishEmpty={this.state.wishEmpty}
							/>
						)}
					/>

					<Route
						path='/maze'
						component={() => (
							<Maze
								finalAnswer={this.state.advice}
								getRandomQuote={this.getRandomQuote}
							/>
						)}
					/>

					<div className='starsContent'>
						<div className='stars'></div>
						<div className='stars2'></div>
						<div className='stars3'></div>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
