import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const WinModal = props => {
  return (
    <div className="winModal">
      <div className="winModalSub">
        <Link to="/results">
          <button>Unveil Your Wish</button>
        </Link>
      </div>
    </div>
  );
};
export default WinModal;
