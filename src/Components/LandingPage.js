import React, { Component } from "react";

import { Link } from "react-router-dom";

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
      { userWish: userInput })


  };

  render() {
    return (

      <div>
        <main className="wrapper zoltarContainer">

          <h1>Zoltar Speaks</h1>

          <img
            className="zoltarImage"
            src={require("../Assets/ZoltarLogo.svg")}
            alt={"Zoltar Speaks Logo"}
          />



          <form className="makeWishContainer" action="submit">
            <h2 className="wishQuestion">What do you wish for?</h2>

            <div className="buttonLinkContainer">

              <label className="wishLabel visuallyHidden">Enter a wish</label>
              <input
                required
                type="text"
                placeholder="enter what you desire here"
                onChange={this.handleChange}
              />

              <div className="wishButton">
                <Link to="/maze">
                  <button
                    className="landingPageButton"
                    onClick={() =>
                      this.props.handleSubmit(this.state.userWish)
                    }
                  >Make wish
                    </button>
                </Link>
              </div>
            </div>
          </form>


        </main>


        <div className="starsContent">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
        </div>

      </div>
    );
  }
}

export default LandingPage;
