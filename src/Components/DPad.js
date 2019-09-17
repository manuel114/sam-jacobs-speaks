import React from "react";

const DPad = ({ showStatus }) => {
  return (
    <div className={`dPad ${showStatus}DPad`}>
      <button
        className="dPadButton dPadLeft"
        onClick={() => {
          if (this.state.reverseControl === false) {
            this.updateCoinLocation("x", -1);
          } else {
            this.updateCoinLocation("x", 1);
          }
        }}
      >
        <span className="visuallyHidden">left</span>
      </button>
      <button
        className="dPadButton dPadUp"
        onClick={() => {
          if (this.state.reverseControl === false) {
            this.updateCoinLocation("y", -1);
          } else {
            this.updateCoinLocation("y", 1);
          }
        }}
      >
        <span className="visuallyHidden">up</span>
      </button>
      <button
        className="dPadButton dPadRight"
        onClick={() => {
          if (this.state.reverseControl === false) {
            this.updateCoinLocation("x", 1);
          } else {
            this.updateCoinLocation("x", -1);
          }
        }}
      >
        <span className="visuallyHidden">right</span>
      </button>
      <button
        className="dPadButton dPadDown"
        onClick={() => {
          if (this.state.reverseControl === false) {
            this.updateCoinLocation("y", 1);
          } else {
            this.updateCoinLocation("y", -1);
          }
        }}
      >
        <span className="visuallyHidden">down</span>
      </button>
    </div>
  );
};

export default DPad;
