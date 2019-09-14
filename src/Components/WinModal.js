import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const WinModal = props => {
  return (
    <div>
      <p>Your wish has been granted!</p>

      <Link to="/results">
        <button>Unveil Your Wish</button>
      </Link>
    </div>
  );
};

export default WinModal;
