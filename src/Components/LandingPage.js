import React, { Component } from "react";
import { Link } from "react-router-dom";
import coinSlot from "../Assets/coinSlot.svg";
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWish: "",
      wishEmpty: false
    };
  }

  handleChange = e => {
    let userInput = e.target.value;
    this.setState({ userWish: userInput });
  };

  emptyStringCheck = (event, userWish) => {
    console.log(userWish);

    if (userWish !== "") {
      this.props.handleSubmit(userWish);
      this.setState({
        wishEmpty: false
      });
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
      <main className="wrapper zoltarContainer">
        <h1>Zoltar Speaks</h1>
        <img
          className="zoltarImage"
          src={require("../Assets/ZoltarLogo.svg")}
          alt={"Zoltar Speaks Logo"}
        />

        <form
          className="makeWishContainer"
          action="submit"
          onSubmit={event => (
            this.emptyStringCheck(event, this.state.userWish)
          )}
        >
          <div className="leftForm">
            <h2 className="wishQuestion">What do you wish for?</h2>
            <label className="wishLabel visuallyHidden">Enter a wish</label>
            <input
              // required
              type="text"
              placeholder="Enter A Wish & Insert Coin"
              onChange={this.handleChange}
              className={`wishInputBox ${
                this.state.wishEmpty === true ? "wishError" : ""
              }`}
            />
          </div>
          <div className="buttonLinkContainer">
            <Link to="/maze">
              <img
                type="button"
                src={coinSlot}
                alt="Coin Slot"
                className="landingPageButton"
                onClick={event =>
                  this.emptyStringCheck(event, this.state.userWish)
                }
              />
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
export default LandingPage;
