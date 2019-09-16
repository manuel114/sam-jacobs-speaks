import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const Results = props => {
  return (
    <div className="wrapper">
      <main>
        <div className="zoltarCard">
          <h2 className="zoltarGranted">your wish is granted </h2>
          <p className="finalAnswer">{props.finalAnswer}</p>
        </div>
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </main>
    </div>
  );
};
export default Results;
