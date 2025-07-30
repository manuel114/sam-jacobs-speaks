import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import samOracleImage from '../Assets/Sam The Oracle Image.png';
import coinSlot from '../Assets/coinSlot.svg';
import coinSlotHover from '../Assets/coinSlotHover.svg';
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userWish: '',
      wishEmpty: false
    };
  }

  handleChange = e => {
    let userInput = e.target.value;
    this.setState({ userWish: userInput });
  };

  emptyStringCheck = (event, userWish) => {
    // check if user input is empty, if not, then pass to user submit and reset wishEmpty state
    if (userWish !== '') {
      this.props.handleSubmit(userWish);

      this.setState({
        wishEmpty: false
      });
      
      // Trigger music start on first user interaction
      this.startBackgroundMusic();
    } else {
      // if user input is empty, prevent default, and toggle wishEmpty to add the error class to user
      event.preventDefault();
      this.setState(
        {
          wishEmpty: true
        },
        () => {
          alert('Enter a GTM question to continue');
        }
      );
    }
  };

  startBackgroundMusic = () => {
    // Find the audio element and start playing
    const audioElement = document.querySelector('audio');
    if (audioElement && audioElement.paused) {
      audioElement.play().then(() => {
        // Update the music component state if it exists
        const musicComponent = document.querySelector('.background-music-controls');
        if (musicComponent) {
          const playBtn = musicComponent.querySelector('.play-btn');
          if (playBtn) {
            playBtn.textContent = '⏸️';
          }
        }
      }).catch(error => {
        console.log('Music start failed:', error);
      });
    }
  };

  isMobile = () => {
    return window.innerWidth <= 736;
  };

  render() {
    return (
      <main className='wrapper zoltarContainer'>
        <div className='titleBlock'>
          <h1>The GTM Oracle</h1>
          <h2 className='subtitle'>"Channeling the wisdom of Sam Jacobs. Powered by hard lessons, Pavilion scars, and a sprinkle of Luxembourg astrology."</h2>
        </div>
        <img
          className='samOracleImage'
          src={samOracleImage}
          alt={'Sam Jacobs Speaks Logo'}
        />

        <form
          className='makeWishContainer'
          action='submit'
          onSubmit={event => event.preventDefault()}>
          {!this.isMobile() ? (
            <>
              <div className='leftForm'>
                <label htmlFor='wish' className='wishLabel visuallyHidden'>
                  Ask your GTM question to start
                </label>
                <input
                  id='wish'
                  type='text'
                  placeholder='Ask your GTM question & Insert Coin'
                  onChange={this.handleChange}
                  className={`wishInputBox ${
                    this.state.wishEmpty === true ? 'wishError' : ''
                  }`}
                />
              </div>
              <div className='buttonLinkContainer'>
                <Link to='/maze'>
                  <div className='submitCard'>
                    <img
                      type='button'
                      src={coinSlot}
                      alt='Coin Slot'
                      className='landingPageButton'
                      onClick={event =>
                        this.emptyStringCheck(event, this.state.userWish)
                      }
                    />
                    <img
                      type='button'
                      src={coinSlotHover}
                      alt='Coin Slot'
                      className='landingPageButtonHover'
                      onClick={event =>
                        this.emptyStringCheck(event, this.state.userWish)
                      }
                    />
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <div className='mobileMessage'>
              <p>Please come back on desktop</p>
            </div>
          )}
        </form>
      </main>
    );
  }
}
export default LandingPage;
