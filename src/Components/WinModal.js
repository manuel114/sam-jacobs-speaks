import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
          <div className="card" onClick={this.flipCard}>
            <div
              className={`front ${
                this.state.flipButtonPressed ? "flipFront" : ""
                }`}
            >
              <h2 className="cardTitle">your wish is granted</h2>

            </div>x

            <div
              className={`back ${
                this.state.flipButtonPressed ? "flipBack" : ""
                }`}
            >
              <p className="modalWish" ><span>{this.props.finalAnswer}</span></p>

              <Link to="/">
                <button className="newWishButton" onClick={this.props.getRandomQuote}>
                  Wish Again?
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
