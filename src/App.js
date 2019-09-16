import React, { Component } from "react";
import axios from "axios";
import filterWish from "./filterWish";
// import firebase from './firebase';
// import './App.css';
import "./Partials/App.scss";
import Maze from "./Components/Maze";
import LandingPage from "./Components/LandingPage";
import Results from "./Components/Results";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      advice: "",

      // Error Handling

      wishEmpty: false
    };
  }

  handleSubmit = (event, userWish) => {
    console.log(userWish);

    if (userWish !== "") {
      // if user input is blank, then add a class onto the wish box
      // else, go as per usual

      const userInput = userWish;

      const filteredWish = filterWish(userInput);
      console.log(filteredWish);

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

        // console.log(answer.data.message);

        if (typeof answer.data.message === "undefined") {
          this.setState(
            {
              // advice: [...this.state.advice, answer.data.slips[0].advice],
              advice: answer.data.slips[0].advice
            },
            () => {
              console.log(this.state.advice);
            }
          );
        } else {
          console.log(this.state.advice);
        }
      });
    } else {
      event.preventDefault();

      this.setState({
        wishEmpty: true
      });
    }
  };

  componentDidMount() {
    // on mount, make an API call, get a random piece of advice and store in state, just in case the user's keyword query doesn't return any result

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
        console.log("error");
      });
  }

  render() {
    return (
      <Router>
        {/* <div 
					className="coinTest avatar">
				</div> */}
        <div className="App">
          <Route
            exact
            path="/"
            component={() => (
              <LandingPage
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                wishEmpty={this.state.wishEmpty}
              />
            )}
          />
          <Route path="/maze" component={Maze} />

          <Route
            path="/results"
            component={() => <Results finalAnswer={this.state.advice} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
