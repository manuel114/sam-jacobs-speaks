import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class WinModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipButtonPressed: false
    };
  }

  flipCard = () => {
    this.setState({
      flipButtonPressed: true
    });
  };

  render() {
    return (
      <div className="winModal">
        <div className="winModalSub">
          {/* <Link to="/results"> */}
          <div className="card">
            <div
              className={`front ${
                this.state.flipButtonPressed ? "flipFront" : ""
              }`}
            >
              <button onClick={this.flipCard}>
                Your Wish Has Been Granted
              </button>
            </div>

            <div
              className={`back ${
                this.state.flipButtonPressed ? "flipBack" : ""
              }`}
            >
              <p>{this.props.finalAnswer}</p>

              <Link to="/">
                <button onClick={this.props.getRandomQuote}>
                  Try another wish?
                </button>
              </Link>
            </div>
          </div>

          {/* On click, flip the card by adding an animation class to the winModalSub */}
          {/* </Link> */}
        </div>
      </div>
    );
  }
}
export default WinModal;
