import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import Maze from '../Components/Maze';
// import Results from '../Components/Results';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWish: ''
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
      <div>
        <h1>Zoltar Speaks</h1>
        <img src='' alt='' />

        <form action='submit'>
          <label htmlFor=''>What is Your Wish?</label>
          <input type='text' onChange={this.handleChange} />

          <Link to='/maze'>
            <button
              onClick={() => this.props.handleSubmit(this.state.userWish)}>
              go to maze
						</button>
          </Link>
        </form>

        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }
}

export default LandingPage;
