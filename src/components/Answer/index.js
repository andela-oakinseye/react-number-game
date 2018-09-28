import React from 'react';
import PropTypes from 'prop-types';

const Answer = (props) => {
  return (
    <div className="col-5 chosen">
    	{ 
      	props.selectedNumbers.map((number, i) => 
          <span 
            key={i}
            onClick={() => props.unselectNumber(number)}>
            { number }
          </span>)
      }
    </div>
  );
}

Answer.propTypes = {
  unselectNumber: PropTypes.func.isRequired,
}

export default Answer;
