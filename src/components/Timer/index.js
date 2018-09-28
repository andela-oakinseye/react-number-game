import React from 'react';

const Timer = (props) => {
  return (
    <div className="timer card text-center">
      <h2> { props.timeLeft } </h2>
    </div>
  );
}

export default Timer;
