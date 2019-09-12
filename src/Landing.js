import React, {Component} from 'react';
import axios from 'axios';
// import Link from 'react-router-dom';

class Landing extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         advice: [],
    //     }
    // }

    // componentDidMount() {
    //     axios({
    //         url: `https://api.adviceslip.com/advice/search`,
    //         method: `GET`,
    //         dataResponse: `json`,
    //         // params: {
    //         //     callback: `life`,
    //         // }
    //     }).then((answer) => {
    //         // console.log(answer);
    //         const quotes = answer.data.results;
    //         this.setState({
    //             quotes,
    //         })
    //     })
    // }

    render() {
        return(
            <div className="landingPage">
                {/* <img src="" alt=""/>
                <form action="submit">
                    <label htmlFor="">What is Your Wish?</label>
                    <input type="text"  />
                    <button type="submit">Deposit a Coin</button>
                </form> */}
            </div>
        )
    }
}

export default Landing;

