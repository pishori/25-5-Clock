import { useState } from 'react';
import Timer from './timer';

function App (){
const [breakLength, setBreakLength] = useState(5);
const [sessionLength, setSessionLength] = useState(25);
const [timeLeft, setTimeLeft] = useState(1500);
const [timerLabel, setTimerLabel] = useState("SESSION");
const [startPause, setStartPause] = useState(false);
const [timeInterval, setTimeInterval] = useState(null);

const startTimer = () => {
  if(timeLeft !== 0 && startPause){
  setTimeInterval(setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000));
}
}

const pauseTimer = () => {
  clearInterval(timeInterval);
}

const handleStartPause = () => {
  setStartPause(!startPause);
  if(startPause) {
    startTimer();
  }
  else{
    pauseTimer();
  }
}

const timeFormatter = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  return `${formattedMinutes}:${formattedSeconds}`;
}

const handleBreakIncrease = () => {
  if(breakLength < 60 ) {
    setBreakLength(breakLength + 1);
    
  }
}

const handleBreakDecrease = () => {
  if(breakLength > 1){
    setBreakLength(breakLength - 1);
  }
}

const handleSessionIncrease = () => {
  if(sessionLength < 60) {   
    setSessionLength(sessionLength + 1);
    setTimeLeft(timeLeft + 60)
  }
}

const handleSessionDecrease = () => {
  if(sessionLength > 1){
    setSessionLength(sessionLength - 1);
    setTimeLeft(timeLeft - 60)
  }
}

const handleReset = () => { 
  clearInterval(timeInterval);
  setStartPause(false);
  setTimeLeft(1500);
  setBreakLength(5);
  setSessionLength(25);
  setTimerLabel("SESSION")
 
  const audio = document.getElementById("beep");
  audio.pause()
  audio.currentTime = 0;
}

const resetPeriod = () => {
  const audio = document.getElementById("beep");
  if(!timeLeft && timerLabel === "SESSION") {
    setTimeLeft(breakLength * 60)
    setTimerLabel("BREAK")
    audio.play()
  }
  if(!timeLeft && timerLabel === "BREAK"){
    setTimeLeft(sessionLength * 60)
    setTimerLabel("SESSION")
    audio.pause()
    audio.currentTime = 0;
  }
}


return (
  <>
    <div className='wrapper'>
      <h2>25 + 5 Clock</h2>
      <div className='break-session-length'>
        <div>
          <h3 id='break-label'>Break Length</h3>
          <div>
            <button disabled={startPause} onClick={handleBreakIncrease} id='break-increment'>Increase</button>
              <strong id='break-length'>{breakLength}</strong>
            <button disabled={startPause} onClick={handleBreakDecrease} id='break-decrement'>Decrease</button>
          </div>
        </div>

        <div>
          <h3 id='session-label'>Session Length</h3>
          <div>
            <button disabled={startPause} onClick={handleSessionIncrease} id='session-increment'>Increase</button>
              <strong id='session-length'>{sessionLength}</strong>
            <button disabled={startPause} onClick={handleSessionDecrease} id='session-decrement'>Decrease</button>
          </div>
        </div>
      </div>

      <div className='time-wrapper'>
        <div className='timer'>
          <h2 id='timer-label'>{timerLabel === "SESSION" ? "Session" : "Break"}</h2>
          <Timer timeFormat={timeFormatter(timeLeft)} />
        </div>
        <button onClick={handleStartPause} id='start_stop'>Start/Pause</button>
        <button onClick={handleReset} id='reset'>Reset</button>
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
export default App;