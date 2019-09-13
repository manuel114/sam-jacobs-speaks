import React, { Component } from "react";
import axios from "axios";
import filterWish from '../filterWish'
import Maze from "./Maze";
import Results from "./Results";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      advice: [],
      userWish: "",
      keyWord: "" // this is the first keyword from the user submission used to submit into the API Call
    };
  }

  handleChange = e => {
    this.setState({
      userWish: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userInput = this.state.userWish;
    // console.log(userSubmit);

    const filteredWish = filterWish(userInput);
    console.log(filteredWish)

    // turn this into an array

    const wordArray = filteredWish.split(" ");
    // console.log(wordArray);

    // take the first value of the array [0] and save it to state

    const userKeyWord = wordArray[0];
    console.log(userKeyWord);

    // run it through the API Call to get contextual advice

    axios({
      url: `https://api.adviceslip.com/advice/search/${userKeyWord}`,
      method: `GET`,
      dataResponse: `json`
    }).then(answer => {
      console.log(answer);

      console.log(answer.data.message);

      if (typeof answer.data.message === "undefined") {
        this.setState(
          {
            advice: [...this.state.advice, answer.data.slips[0].advice],
            advice: answer.data.slips[0].advice
          },
          () => {
            console.log(this.state.advice);
          }
        );
      }
    });
  };

  componentDidMount() {
    // on mount, lets do an API call, get a random piece of advnce and save

    axios({
      url: `https://api.adviceslip.com/advice`,
      method: `GET`,
      dataResponse: `json`
    })
      .then(answer => {
        console.log(answer);

        // console.log(answer.data.slip.advice);

        const randomQuote = answer.data.slip.advice;

        this.setState({
          advice: randomQuote
        });
      })
      .catch(() => {
        console.log("error");
      });
  }

  render() {
    return (
      <div>
        <h1>Zoltar Speaks</h1>
        <img src="" alt="" />

        <form action="submit">
          <label htmlFor="">What is Your Wish?</label>
          <input type="text" onChange={this.handleChange} />

          <Link to="/maze">
            <button type="submit" onClick={this.handleSubmit}>
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
