import React, { Component } from "react";
import { Link } from "react-router-dom";
import coinSlot from "../Assets/coinSlot.svg";
import coinSlotHover from "../Assets/coinSlotHover.svg";
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
    // check if user input is empty, if not, then pass to user submit and reset wishEmpty state
    if (userWish !== "") {
      this.props.handleSubmit(userWish);

      this.setState({
        wishEmpty: false
      });
    } else {

      // if user input is empty, prevent default, and toggle wishEmpty to add the error class to user 
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
          onSubmit={event => event.preventDefault()}
        >
          <div className="leftForm">
            
            <label className="wishLabel visuallyHidden">Enter a wish</label>
            <input
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
              <div className="submitCard">
                <img
                  type="button"
                  src={coinSlot}
                  alt="Coin Slot"
                  className="landingPageButton"
                  onClick={event =>
                    this.emptyStringCheck(event, this.state.userWish)
                  }
                />
                <img
                  type="button"
                  src={coinSlotHover}
                  alt="Coin Slot"
                  className="landingPageButtonHover"
                  onClick={event =>
                    this.emptyStringCheck(event, this.state.userWish)
                  }
                />
              </div>
            </Link>
          </div>
        </form>
      </main>
    );
  }
}
export default LandingPage;
