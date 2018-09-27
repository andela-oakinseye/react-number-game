import React from 'react';
import _ from 'lodash';

import Answer from '../../components/Answer';
import Button from '../../components/Button';
import DoneFrame from '../../components/DoneFrame';
import Numbers from '../../components/Numbers';
import Stars from '../../components/Stars';

import possibleCombinationSum from '../../util/PossibleCombinationSum';

import './index.css';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = Game.initialState();
    this.selectNumber = this.selectNumber.bind(this);
    this.unselectNumber = this.unselectNumber.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.acceptAnswer = this.acceptAnswer.bind(this);
    this.redraw = this.redraw.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }
  static initialState = () => ({
    randomNumberOfStars: Game.getRandomNumber(),
    selectedNumbers: [],
    usedNumbers: [], 
    answerIsCorrect: null,
    redraws: 5,
    doneStatus: null,
  })

  static getRandomNumber() {
    return 1 + Math.floor(Math.random() * 9);
  }
  selectNumber(clickedNumber) {
  if (this.state.selectedNumbers.includes(clickedNumber))
      return;
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }))
  }
  unselectNumber(clickedNumber) {
    if(!this.state.selectedNumbers.includes(clickedNumber))
      return;
  
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
    }));
  }

  checkAnswer() {
    this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => n + acc)
    }));
  }

  acceptAnswer() {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: Game.getRandomNumber(),
    }), this.updateDoneStatus);
  }

  redraw() {
    return this.state.redraws > 0 ? this.setState(prevState => ({
      selectedNumbers: [],
      answerIsCorrect: null,
      randomNumberOfStars: Game.getRandomNumber(),
      redraws: prevState.redraws - 1,
    }), this.updateDoneStatus): false;
  }


  possibleSolution({ randomNumberOfStars, usedNumbers }) {
    const possibleNumbers = _.range(1, 10).filter(number => !usedNumbers.includes(number));
    return possibleCombinationSum(possibleNumbers, randomNumberOfStars)
  }

  updateDoneStatus() {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done nice!!' };
      }
      if (prevState.redraws === 0 && !this.possibleSolution(prevState)) {
        return { doneStatus: 'Game Over!' };
      }
    });
  }

  resetGame() {
    return this.setState(Game.initialState());
  }

    render(){
      const { 
        selectedNumbers,
        usedNumbers, 
        randomNumberOfStars, 
        answerIsCorrect,
        redraws,
        doneStatus,
       } = this.state;
      return (
        <div className="container">
          <h3> Play Nine </h3>
          <hr />
          <div className="row">
            <Stars numberOfStars={randomNumberOfStars} />
            <Button 
              selectedNumbers={selectedNumbers}
              answerIsCorrect={answerIsCorrect} 
              checkAnswer={this.checkAnswer}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw}
              redraws={redraws} />
            <Answer 
              selectedNumbers={selectedNumbers}
              unselectNumber={this.unselectNumber} />
          </div>
          <br />
          {
            doneStatus ?
              <DoneFrame 
                doneStatus={doneStatus} 
                reset={this.resetGame}
                /> :
                <Numbers 
              selectedNumbers={selectedNumbers}
              usedNumbers={usedNumbers}
              selectNumber={this.selectNumber} />
          }
          
            
        </div>
      );
    }
  }

  export default Game;