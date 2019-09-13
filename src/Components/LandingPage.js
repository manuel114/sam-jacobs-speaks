import React, { Component } from "react";
import axios from "axios";

import Maze from "./Maze";
import Results from "./Results";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userWish: ""
    }
  }

  handleChange = e => {

    let userInput = e.target.value

    this.setState({
      userWish: userInput
    }, () => {
      console.log(this.state.userWish);
    });

  };

  render() {
    return (
      <div>
        <h1>Zoltar Speaks</h1>
        <img src="" alt="" />

        <form action="submit">
          <label htmlFor="">What is Your Wish?</label>
          <input type="text" onChange={this.handleChange} />

          <Link to="/maze">
            <button type="submit" onClick={(e) => this.props.handleSubmit(e, this.state.userWish)}>
              Deposit a Coin
            </button>
          </Link>

          <Route path="/maze" component={Maze} />
        </form>
      </div>
    );
  }
}

export default LandingPage;
