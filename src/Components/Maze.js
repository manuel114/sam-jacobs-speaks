import React, { Component } from "react";

class Maze extends Component {
constructor(props){
   super(props)
   this.state={
      mazeMap: [
                 [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                 [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                 [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
                 [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1],
                 [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
                 [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
                 [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                 [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
                 [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                 [1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                 [1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1]
               ]
             }
   }

    render() {

        return (
          <div>
            <h1>Maze</h1>
            <div className='maze'>
           {this.state.mazeMap.map((item, index) => {
              return item.map((cell, i) => {
                if (cell === 0) {
                  return <div className='cell path'>path</div>;
                } else {
                  return <div className='cell wall'>wall</div>;
                }
              });
            })}
          </div>
          </div>
        );
    }

}

export default Maze;