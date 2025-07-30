import React, { Component } from 'react';
import bgMusic from '../Assets/gtm-oracle-bg-music.wav';

class BackgroundMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isMuted: false,
      volume: 0.12
    };
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.audio = this.audioRef.current;
    this.audio.volume = this.state.volume;
    this.audio.loop = true;
    
    // Handle audio context for mobile browsers
    this.setupAudioContext();
    
    // Auto-start music after a short delay to handle browser restrictions
    setTimeout(() => {
      this.audio.play().then(() => {
        this.setState({ isPlaying: true });
      }).catch(error => {
        console.log('Auto-play failed (user interaction required):', error);
        // Don't change state if auto-play fails - user will need to click play
      });
    }, 1000);
  }

  setupAudioContext = () => {
    // Create audio context for better mobile compatibility
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  togglePlay = () => {
    if (this.state.isPlaying) {
      this.audio.pause();
      this.setState({ isPlaying: false });
    } else {
      this.audio.play().catch(error => {
        console.log('Audio play failed:', error);
      });
      this.setState({ isPlaying: true });
    }
  }

  toggleMute = () => {
    if (this.state.isMuted) {
      this.audio.volume = this.state.volume;
      this.setState({ isMuted: false });
    } else {
      this.audio.volume = 0;
      this.setState({ isMuted: true });
    }
  }

  handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    this.setState({ volume: newVolume });
    if (!this.state.isMuted) {
      this.audio.volume = newVolume;
    }
  }

  render() {
    return (
      <div className="background-music-controls">
        <audio ref={this.audioRef} src={bgMusic} preload="auto" />
        
        <div className="music-controls">
          <button 
            className="music-btn play-btn"
            onClick={this.togglePlay}
            title={this.state.isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {this.state.isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <button 
            className="music-btn mute-btn"
            onClick={this.toggleMute}
            title={this.state.isMuted ? 'Unmute' : 'Mute'}
          >
            {this.state.isMuted ? '🔇' : '🔊'}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={this.state.volume}
            onChange={this.handleVolumeChange}
            className="volume-slider"
            title="Volume"
          />
        </div>
      </div>
    );
  }
}

export default BackgroundMusic; 