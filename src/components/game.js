import React from 'react';

import '../index.css';
import Board from './board.js';
import FallenSoldierBlock from './fallen-soldier-block.js';
import initialiseChessBoard from '../helpers/board-initialiser.js';

const initialState = {
  squares: '',
  whiteFallenSoldiers: [],
  blackFallenSoldiers: [],
  player: 1,
  sourceSelection: -1,
  status: '',
  turn: 'white',
  load: true,
}

export default class Game extends React.Component {
  constructor(){
    super();
    this.state = initialState
  }

// componentDidMount() {
    
//   var serialObj = JSON.stringify(this.state); //сериализуем его

//   localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"

//   var returnObj = JSON.parse(localStorage.getItem("myKey"))

//   console.log(returnObj);

//   this.setState(returnObj);
// }



  load() {
    this.setState({
      squares: initialiseChessBoard(),
      load: !this.state.load
    });
  }

  save() {
    
    
    
  }
 
  reset() {
    this.setState({
      squares: initialiseChessBoard(),
      whiteFallenSoldiers: [],
      blackFallenSoldiers: [],
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
    });
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    
    if(this.state.sourceSelection === -1){
      if(!squares[i] || squares[i].player !== this.state.player){
        this.setState({status: "Wrong selection. Choose player " + this.state.player + " pieces."});
   
      }
      else{
        squares[i].style = {...squares[i].style, backgroundColor: "RGB(111,143,114)"}; // Emerald from http://omgchess.blogspot.com/2015/09/chess-board-color-schemes.html
        this.setState({
          status: "Choose destination for the selected piece",
          sourceSelection: i,
          color: "RGB(111,143,114)",
        });
      }
    }

    else if(this.state.sourceSelection > -1){
    
      if(squares[i] && squares[i].player === this.state.player){
        this.setState({
          status: "Wrong selection. Choose valid source and destination again.",
          sourceSelection: -1,
        });
      }
      else{
        
        const squares = this.state.squares.slice();
        const whiteFallenSoldiers = this.state.whiteFallenSoldiers.slice();
        const blackFallenSoldiers = this.state.blackFallenSoldiers.slice();
        const isDestEnemyOccupied = squares[i]? true : false; 
        const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);
        const srcToDestPath = squares[this.state.sourceSelection].getSrcToDestPath(this.state.sourceSelection, i);
        const isMoveLegal = this.isMoveLegal(srcToDestPath);

        if(isMovePossible && isMoveLegal){
          if(squares[i] !== null){
            if(squares[i].player === 1){
              whiteFallenSoldiers.push(squares[i]);
            }
            else{
              blackFallenSoldiers.push(squares[i]);
            }
          }
          squares[i] = squares[this.state.sourceSelection];
          squares[this.state.sourceSelection] = null;
          let player = this.state.player === 1? 2: 1;
          let turn = this.state.turn === 'white'? 'black' : 'white';
          this.setState({
            sourceSelection: -1,
            squares: squares,
            whiteFallenSoldiers: whiteFallenSoldiers,
            blackFallenSoldiers: blackFallenSoldiers,
            player: player,
            status: '',
            turn: turn
          });
        }
        else{
          this.setState({
            status: "Wrong selection. Choose valid source and destination again.",
            sourceSelection: -1,
          });
        }
      }
    }

  }

  isMoveLegal(srcToDestPath){
    let isLegal = true;
    for(let i = 0; i < srcToDestPath.length; i++){
      if(this.state.squares[srcToDestPath[i]] !== null){
        isLegal = false;
      }
    }
    return isLegal;
  }

  render() {

    return (
      <div>
        <div className="game">
          <div className="fallen-soldier-block">
              {<FallenSoldierBlock
              whiteFallenSoldiers = {this.state.whiteFallenSoldiers}
              blackFallenSoldiers = {this.state.blackFallenSoldiers}
              />
            }
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{backgroundColor: this.state.turn}}>
  
            </div>
            <div className="game-status">{this.state.status}</div>
            
          </div>
          <div className="game-board">
            <Board 
            squares = {this.state.squares}
            onClick = {(i) => this.handleClick(i)}
            />
          </div>
          
        </div>
        <div className="bottom">
          <button className="btn" onClick={() => this.reset()}>Reset</button>
          {
            this.state.load ? 
              <button className="btn" onClick={() => this.load()}>Load game</button>
            : ''  
          }
        </div>
        

  
      </div>

     
      );
  }
}

