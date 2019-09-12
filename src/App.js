import React, {Component} from 'react';
import axios from 'axios';
// import Landing from './Landing';
// import firebase from './firebase';
import './App.css';
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Link
// } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = {
			advice: [],
			userWish: ''
		}
	}

	handleChange = (e) => {
		const userInput = e.target.value
		this.setState({
			userWish: userInput,
		});
		console.log(userInput);
	}

	componentDidMount() {
		axios({
			url: `https://api.adviceslip.com/advice/search/life`,
			method: `GET`,
			dataResponse: `json`,
			// params: {
			//     callback: `life`,
			// }
		}).then((answer) => {
			console.log(answer);
			const quotes = answer.data.results;
			this.setState({
				quotes,
			})
		})
	}
	render() {
		return (
			<div className='App'>
				<h1>Zoltar Speaks</h1>
				{/* <Landing /> */}
				<img src="" alt="" />
				<form action="submit">
					<label htmlFor="">What is Your Wish?</label>
					<input type="text" onChange={this.handleChange} />
					<button type="submit">Deposit a Coin</button>
				</form>
			</div>
		);

	}
}

export default App;
