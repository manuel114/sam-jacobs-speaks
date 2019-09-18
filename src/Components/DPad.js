import React from "react";

const DPad = ({ showStatus, tap, reverseControl}) => {
  return (
    <div className={`dPad ${showStatus}DPad`}>
      <button
        className="dPadButton dPadLeft"
        onClick={() => {
          if (reverseControl === false) {
            tap("x", -1);
          } else {
            tap("x", 1);
          }
        }}
      >
        <span className="visuallyHidden">Left</span>
      </button>
      <button
        className="dPadButton dPadUp"
        onClick={() => {
          if (reverseControl === false) {
            tap("y", -1);
          } else {
            tap("y", 1);
          }
        }}
      >
        <span className="visuallyHidden">Up</span>
      </button>
      <button
        className="dPadButton dPadRight"
        onClick={() => {
          if (reverseControl === false) {
            tap("x", 1);
          } else {
            tap("x", -1);
          }
        }}
      >
        <span className="visuallyHidden">Right</span>
      </button>
      <button
        className="dPadButton dPadDown"
        onClick={() => {
          if (reverseControl === false) {
            tap("y", 1);
          } else {
            tap("y", -1);
          }
        }}
      >
        <span className="visuallyHidden">Down</span>
      </button>
    </div>
  );
};

export default DPad;
