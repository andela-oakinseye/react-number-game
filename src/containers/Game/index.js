import React from 'react';
import Answer from '../../components/Answer';
import Button from '../../components/Button';
import Numbers from '../../components/Numbers';
import Stars from '../../components/Stars';

import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
    selectedNumbers: [],
    }
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
  }
  
  selectNumber(clickedNumber) {
  if (this.state.selectedNumbers.includes(clickedNumber))
      return;
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  }
  unselectNumber(clickedNumber) {
    if(!this.state.selectedNumbers.includes(clickedNumber))
      return ;
  
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }))
  }
    render(){
      return (
        <div className="container">
          <h3> Play Nine </h3>
          <hr />
          <div className="row">
            <Stars numberOfStars={this.state.randomNumberOfStars} />
            <Button />
            <Answer 
              selectedNumbers={this.state.selectedNumbers}
              unselectNumber={this.unselectNumber} />
          </div>
          <br />
          <Numbers 
            selectedNumbers={this.state.selectedNumbers}
            selectNumber={this.selectNumber} />
        </div>
      );
    }
  }

  export default Game;