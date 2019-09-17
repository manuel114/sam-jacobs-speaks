import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class LandingPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userWish: '',
			wishEmpty: false
		};
	}

	handleChange = e => {
		let userInput = e.target.value;

		this.setState({ userWish: userInput });
	};

	emptyStringCheck = (event, userWish) => {
		if (userWish !== '') {
			this.props.handleSubmit(userWish);
		} else {
			event.preventDefault();
			this.setState(
				{
					wishEmpty: true
				},
				() => {
					console.log(this.state.wishEmpty);
				}
			);
		}
	};

	render() {
		return (
			<main className='wrapper zoltarContainer'>
				<h1>Zoltar Speaks</h1>

				<img
					className='zoltarImage'
					src={require('../Assets/ZoltarLogo.svg')}
					alt={'Zoltar Speaks Logo'}
				/>

				<form className='makeWishContainer' action='submit'>
					<h2 className='wishQuestion'>What do you wish for?</h2>

					<div className='buttonLinkContainer'>
						<label className='wishLabel visuallyHidden'>Enter a wish</label>

						<input
							required
							type='text'
							placeholder='enter what you desire here'
							onChange={this.handleChange}
							className={this.state.wishEmpty === true ? 'wishError' : ''}
						/>

						<div className='wishButton'>
							<Link to='/maze'>
								<button
									className='landingPageButton'
									onClick={event =>
										this.emptyStringCheck(event, this.state.userWish)
									}>
									Make wish
								</button>
							</Link>
						</div>
					</div>
				</form>
			</main>
		);
	}
}

export default LandingPage;
