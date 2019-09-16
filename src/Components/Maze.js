import React, { Component } from "react";
import WinModal from "./WinModal";

class Maze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mazeMap: [
        [-1, 0, 0, -3, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, -2]
      ],
      playerLocation: {
        x: 1,
        y: 1
      },
      showModal: false
    };
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }
  updateCoinLocation = (axis, vector) => {
    console.log(vector);
    console.log(this.state.playerLocation);
    // this is where it's counting
    if (
      this.state.playerLocation[axis] + vector <= 0 ||
      this.state.playerLocation[axis] + vector > this.state.mazeMap.length
    ) {
      console.log("out of bounds");
    } else {
      console.log("in bounds");
      this.checkTargetCell(this.state.playerLocation, axis, vector);
    }
    console.log("this.state.playerLocation", this.state.playerLocation);
  };

  checkTargetCell = (playerLocation, axis, vector) => {
    const target = {
      x: playerLocation.x,
      y: playerLocation.y
    };
    target[axis] += vector;
    const targetCellValue = this.state.mazeMap[target.y - 1][target.x - 1];
    // console.log('check target cell x, y', target.x, target.y);
    console.log("target", target);
    console.log("targetCellValue", targetCellValue);
    switch (targetCellValue) {
      case -1: {
        this.moveCoin(target);
        break;
      }
      case -2: {
        this.moveCoin(target);
        this.setState({
          showModal: true
        });
        break;
      }
      case -3:{
        this.moveCoin(target);
        this.setState({
          spin:true
        })
      }
      case 0: {
        this.moveCoin(target);
        break;
      }
    }
  };

  moveCoin = target => {
    console.log("move coin", target);
    console.log("player location changed");
    document.querySelector(".player").style.transform = `translate(${target.x -
      1}00%,${target.y - 1}00%)`
    this.setState({ playerLocation: target });
  };

  handleKeyPress = e => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowUp": {
        this.updateCoinLocation("y", -1);
        break;
      }
      case "ArrowDown": {
        this.updateCoinLocation("y", 1);
        break;
      }
      case "ArrowLeft": {
        this.updateCoinLocation("x", -1);
        break;
      }
      case "ArrowRight": {
        this.updateCoinLocation("x", 1);
        break;
      }
    }
  };
  render() {
    return (
      //   <div className="mazeOverall">
      <main
        className="mazeContainer"
        onKeyPress={this.handleKeyPress}
      >
        
        <div className="mazeLayer">
          {this.state.mazeMap.map((row, Y) => {
            return row.map((cell, X) => {
              if (cell !== 1) {
                return <div className="cell mapCell path"></div>;
              } else {
                return <div className="cell mapCell wall"></div>;
              }
            });
          })}
          <div className="movingLayer">
            {this.state.mazeMap.map((row, Y) => {
              return row.map((cell, X) => {
                if (cell === -1) {
                  // starting location
                  return (
                    <div className="cell movingCell player">
                      <div className="avatar"></div>
                    </div>
                  );
                } else {
                  return <div className="cell movingCell"></div>;
                }
              });
            })}
          </div>
        </div>
        <div className="controller">
          <button
            onClick={() => {
              this.updateCoinLocation("x", -1);
            }}
          >
            Left
          </button>
          <button
            onClick={() => {
              this.updateCoinLocation("y", -1);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              this.updateCoinLocation("x", 1);
            }}
          >
            Right
          </button>
          <button
            onClick={() => {
              this.updateCoinLocation("y", 1);
            }}
          >
            Down
          </button>
        </div>

        {this.state.showModal ? <WinModal /> : null}
        {/* modal appears if victory condition is set to true */}
      </main>

      //   </div>
    );
  }
}
export default Maze;
