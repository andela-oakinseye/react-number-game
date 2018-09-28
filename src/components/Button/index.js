import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  let button;
  switch(props.answerIsCorrect) {
    case true:
      button = 
        <button 
          className="btn btn-success btn-lg"
          onClick={props.acceptAnswer}>
            <i className="fa fa-check"></i>
        </button>
      break;
    case false:
      button = 
        <button className="btn btn-danger btn-lg">
          <i className="fa fa-times"></i>
        </button>
      break;
    default:
      button = 
        <button 
          className="btn btn-secondary btn-lg" 
          disabled={!props.selectedNumbers.length}
          onClick={props.checkAnswer}>
            <i className="fa fa-check"></i>
      </button>
  }
  return (
    <div className="col-2 text-center">
      { button }
      <br />
      <br />
      <button 
        className="btn btn-warning btn-sm"
        onClick={props.redraw}
        disabled={props.redraws === 0}>
        <i className="fa fa-sync"></i> {props.redraws}
      </button>
    </div>
  );
}

Button.propTypes = {
  selectedNumbers: PropTypes.array.isRequired,
}
export default Button;
