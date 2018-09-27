import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Stars = (props) => {
	return (
  	<div className="col-5">
    	{ _.range(props.numberOfStars).map(i => <i key={i} className="fa fa-star"></i>) }
    </div>
  );
}

Stars.propTypes = {
  numberOfStars: PropTypes.number.isRequired
}

export default Stars;
