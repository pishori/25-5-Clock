import { Component } from 'react';
import Timer from './timer';

class App extends Component{
  constructor (props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 1500,
      startPause: false,
      setTimeInterval: null,
      inSession: true,
      timingLabel: "Session",
    }

    this.handleBreakDecrease = this.handleBreakDecrease.bind(this);
    this.handleBreakIncrease = this.handleBreakIncrease.bind(this);

    this.handleSessionDecrease = this.handleSessionDecrease.bind(this);
    this.handleSessionIncrease = this.handleSessionIncrease.bind(this);

    this.handlestartPause = this.handlestartPause.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.timeFormatter = this.timeFormatter.bind(this);
  }
  
  handlestartPause() { 
    if (this.state.startPause === false) { 
      document.getElementById('start_stop').style.backgroundColor="#f73838"; 
      this.setState({
        setTimeInterval: setInterval(() => {
          if (this.state.timeLeft > 0) {
            let label = this.state.timingLabel;
            if (this.state.timeLeft === 1) {
              label = this.state.inSession == true ? "Break" : "Session";
            }
            this.setState({ timeLeft: this.state.timeLeft - 1, timingLabel: label});
          }

          else {
            if (this.state.timeLeft === 0) {
              var audio = document.getElementById('beep');
              audio.paused ? audio.play() : audio.currentTime = 0
              setTimeout(() => {
                document.getElementById('beep').pause();
              },3000);
            }
                
            let final = 0;
            if (this.state.inSession === true) {
              final = this.state.breakLength * 60;
              this.setState({ timeLeft: final, inSession: false });
            }
            else if (this.state.inSession === false) {
              final = this.state.sessionLength * 60;
              this.setState({ timeLeft: final, inSession: true });
            }
          }
        }, 1000)
      });
      this.setState({ startPause: true });
    }
    else {
      document.getElementById('start_stop').style.backgroundColor="#2eaa25";
        clearInterval(this.state.setTimeInterval);
        this.setState({ startPause: false });
    }
  }
 
  handleBreakIncrease() {
    if (this.state.startPause === false){
      if(this.state.breakLength < 60) {
        this.setState({
          breakLength: this.state.breakLength + 1,
        });
      }
    }    
  }
  
  handleBreakDecrease() {
    if (this.state.startPause === false){
      if(this.state.breakLength > 1){
        this.setState({
          breakLength: this.state.breakLength - 1,        
        });
      }
    }
  }

  handleSessionIncrease() {
    if (this.state.startPause === false){
      if(this.state.sessionLength < 60) {
        this.setState({
          sessionLength: this.state.sessionLength + 1,
          timeLeft: (this.state.sessionLength + 1) * 60
        });
      }
    }
   
  }
  
  handleSessionDecrease() {
    if (this.state.startPause === false){
      if(this.state.sessionLength > 1){
        this.setState({
          sessionLength: this.state.sessionLength - 1,
          timeLeft: (this.state.sessionLength - 1) * 60
        });
      }
    }
    
  }

  handleReset() {
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;

    this.setState(() => ({
      timeLeft: 1500,
      sessionLength: 25, 
      breakLength: 5,
      startPause: false,
      inSession: true,
      timingLabel: "Session",
    }))
    clearInterval(this.state.setTimeInterval)
  }

  timeFormatter(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  // resetSession_Period() {
  //   const audio = document.getElementById("beep");
  //   if(timeLeft === 0 && timingLabel === "SESSION"){
  //     this.setState(() => ({
  //       breakLength: this.state.breakLength * 60,
  //       timingLabel: "BREAK",
  //     }))
  //     audio.startPause()
  //   }
  //   if(!timeLeft && timingLabel === "BREAK"){
  //     this.setState(() => ({
  //       sessionLength: this.state.sessionLength * 60,
  //       timingLabel: "SESSION",
  //     }))
  //     audio.pause()
  //     audio.currentTime = 0;
  //   }
  // }

  render() {  

    return (
    <>
      <div className='wrapper'>
        <h2>25 + 5 Clock</h2>
        <div className='break-session-length'>
          <div >
            <h3 id='break-label'>Break Length</h3>
            <div>
              <button id='break-increment' onClick={this.handleBreakIncrease}>Increase</button>
              <strong id='break-length'>{this.state.breakLength}</strong>
              <button id='break-decrement' onClick={this.handleBreakDecrease}>Decrease</button>
            </div>
          </div>

          <div>
            <h3 id='session-label'>Session Length</h3>
            <div>
              <button id='session-increment' onClick={this.handleSessionIncrease} >Increase</button>
              <strong id='session-length'>{this.state.sessionLength}</strong>
              <button  id='session-decrement'onClick={this.handleSessionDecrease}>Decrease</button>
            </div>
          </div>
        </div>

        <div className='time-wrapper'>
          <div className='timer'>
            <h2 id='timer-label'>{this.state.timingLabel}</h2>
            <Timer timeFormat={this.timeFormatter(this.state.timeLeft)} />
          </div>
          <button onClick={this.handlestartPause} id='start_stop'>Start/Stop</button>
          <button onClick={this.handleReset} id='reset'>Reset</button>
        </div>
      </div>
      <audio
        id='beep'
        preload='auto'
        src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'
      >
      </audio>
    </>
    );
  }

  }
  
export default App;