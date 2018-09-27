import React from 'react';

const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button 
        className="btn btn-secondary"
        onClick={props.reset}
        >Play Again</button>
    </div>
  );
}


export default DoneFrame;
