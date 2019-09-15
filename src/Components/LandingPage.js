import React, { Component } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import ZoltarLogo from '../Assets/ZoltarLogo.svg';
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
        <header className="zoltarContainer">
          <div className="zoltarTitleImage">
            <h1>Zoltar Speaks</h1>
            <img className="zoltarImage" src={require("../Assets/ZoltarLogo.svg")} alt={"Zoltar Speaks Logo"} />
          </div>

          <div className="makeWishContainer">
            <form action='submit'>
              <h2 className="wishQuestion">What do you wish for?</h2>

              <div className="buttonLinkContainer">
                <div className="userInput">
                  <label className="wishLabel hidden"></label>
                  <input type='text' onChange={this.handleChange} />
                </div>
                <div className="wishButton">
                  <Link to='/maze'>
                    <button className="landingPageButton"
                      onClick={() => this.props.handleSubmit(this.state.userWish)}>
                      enter maze
                	  </button>
                  </Link>
                </div>
              </div>
            </form>

          </div>

        </header>

        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
      </div>
    );
  }
}

export default LandingPage;
