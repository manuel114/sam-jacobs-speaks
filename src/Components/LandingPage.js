// import React, { Component } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Maze from './Maze';
// import Results from './Results';
// // import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// class LandingPage extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			userWish: ''
// 		};
// 	}

// 	handleChange = e => {
// 		let userInput = e.target.value;

// 		this.setState(
// 			{
// 				userWish: userInput
// 			},
// 			() => {
// 				console.log(this.state.userWish);
// 			}
// 		);
// 	};

// 	render() {
// 		return (
// 			// <Router>
// 			<div>
// 				<h1>Zoltar Speaks</h1>
// 				<img src='' alt='' />

// 				<form action='submit'>
// 					<label htmlFor=''>What is Your Wish?</label>
// 					<input type='text' onChange={this.handleChange} />

// 					<Link to='/maze'>
// 						<button
// 							onClick={() => this.props.handleSubmit(this.state.userWish)}>
// 							go to maze
// 						</button>
// 					</Link>
// 				</form>
// 			</div>
// 		);
// 	}
// }

// export default LandingPage;

import React, { Component } from "react";
// import axios from 'axios';
import { Link } from "react-router-dom";
// import ZoltarLogo from '../Assets/ZoltarLogo.svg';
// import Maze from '../Components/Maze';
// import Results from '../Components/Results';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWish: ""
    };
  }

  handleChange = e => {
    let userInput = e.target.value;

    this.setState(
      {
        userWish: userInput
      },
      () => {
        console.log(this.state.userWish);
      }
    );
  };

  render() {
    return (
      // <Router>
      <div className="wrapper">
        <div>
          <header className="zoltarContainer">
            <div className="zoltarFrame">
              <div className="zoltarTitleImage">
                <h1>Zoltar Speaks</h1>
                <img
                  className="zoltarImage"
                  src={require("../Assets/ZoltarLogo.svg")}
                  alt={"Zoltar Speaks Logo"}
                />
              </div>

              <div className="makeWishContainer">
                <form action="submit">
                  <h2 className="wishQuestion">What do you wish for?</h2>

                  <div className="buttonLinkContainer">
                    <div className="userInput">
                      <label className="wishLabel hidden"></label>
                      <input
                        type="text"
                        placeholder="enter what you desire here"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="wishButton">
                      <Link to="/maze">
                        <button
                          className="landingPageButton"
                          onClick={() =>
                            this.props.handleSubmit(this.state.userWish)
                          }
                        >
                          <i
                            aria-hidden="true"
                            title="Down arrow icon let's user know to go down or more to see"
                            className="fas fa-grip-lines"
                          >
                            enter
                          </i>
                        </button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </header>

          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
