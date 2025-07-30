import React, { Component } from 'react';
import axios from 'axios';
import filterWish from './filterWish';
import './Partials/App.scss';
import Maze from './Components/Maze';
import LandingPage from './Components/LandingPage';
import BackgroundMusic from './Components/BackgroundMusic';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      advice: '',
      userQuestion: '',
      isLoading: false,
      mazeKey: 0 // Add a key to control maze recreation
    };
  }

  handleSubmit = userQuestion => {
    const userInput = userQuestion;
    ///run the imported filterWish function to remove filler words
    const filteredQuestion = filterWish(userInput);

    // Reset maze key to ensure fresh maze state
    this.setState({ 
      mazeKey: this.state.mazeKey + 1,
      userQuestion: userInput // Store the original user question
    });

    // Get personalized advice from Sam's OpenAI assistant
    this.getSamAdvice(filteredQuestion);
  };

  componentDidMount() {
    // on mount, get a default piece of advice
    this.setState({
      advice: "Ask your GTM question and insert the coin to get Sam's wisdom."
    });
  }
  
  getSamAdvice = async (question) => {
    this.setState({ isLoading: true });
    
    // Use localhost in development, /api/advice in production
    const apiUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001/api/advice'
      : '/api/advice';

    try {
      const response = await axios.post(apiUrl, {
        userQuestion: question
      });
      
      this.setState({
        advice: response.data.advice,
        isLoading: false
      });
    } catch (error) {
      console.error('Error getting advice from Sam:', error);
      this.setState({
        advice: "Sam is taking a break. Try again in a moment.",
        isLoading: false
      });
    }
  };

  render() {
    return (
      <Router>
        <div className='app'>
          <BackgroundMusic />
          
          <Route
            exact
            path='/'
            component={() => (
              <LandingPage
                handleSubmit={this.handleSubmit}
                wishEmpty={this.state.wishEmpty}
              />
            )}
          />

          <Route
            path='/maze'
            render={() => (
              <Maze
                key={this.state.mazeKey}
                finalAnswer={this.state.advice}
                userQuestion={this.state.userQuestion}
                isLoading={this.state.isLoading}
                getRandomQuote={this.getSamAdvice}
              />
            )}
          />

          <div className='starsContent'>
            <div className='stars'></div>
            <div className='stars2'></div>
            <div className='stars3'></div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
