import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Piece from "./pieces/piece.js";
import Bishop from "./pieces/bishop.js";
import King from "./pieces/king.js";
import Knight from "./pieces/knight.js";
import Pwan from "./pieces/pwan.js";
import Queen from "./pieces/queen.js";
import Rook from "./pieces/rook.js";

let newBoard = [
  [new Rook(true), new Knight(true), new Bishop(true), new King(true), new Queen(true), new Bishop(true), new Knight(true), new Rook(true)],
  [new Pwan(true), new Pwan(true), new Pwan(true), new Pwan(true), new Pwan(true), new Pwan(true), new Pwan(true), new Pwan(true)],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [new Pwan(false), new Pwan(false), new Pwan(false), new Pwan(false), new Pwan(false), new Pwan(false), new Pwan(false), new Pwan(false),],
  [new Rook(false), new Knight(false), new Bishop(false), new King(false), new Queen(false), new Bishop(false), new Knight(false), new Rook(false)],
]

class Tile extends React.PureComponent {
  render() {
    let isWhiteClass = this.props.isWhite ? "tile-white" : "tile-black";
    let img = this.props.piece ? <img alt={"piece"} src={this.props.piece.src} onClick={() => { this.props.onClick(this.props.xPos, this.props.yPos) }} /> : null;

    let isSelected = this.props.highlight ? " tile-highlight" : "";
    return <div
      className={"tile " + isWhiteClass + isSelected}
      onClick={!this.props.piece ? () => { this.props.onClick(this.props.xPos, this.props.yPos) } : () => { }}
    >
      {img}
    </div>
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    console.log(newBoard[0][3]);
    this.state = {
      history: [newBoard,],
      pieceSelected: { x: null, y: null, },
      isWhiteTurn: true,
      kingBlack: newBoard[7][3],
      kingWhite: newBoard[0][3],
    }
  }

  handleBoackClick(x, y) {
    //get current board
    let history = this.state.history;
    let current = history[history.length - 1];


    //check if piece selected
    if (this.checkIfPieceSelected()) {
      //piece is selected

      //check if kings are checked
      let isKingChecked = this.state.isWhiteTurn ? this.state.kingWhite.isChecked : this.state.kingBlack.isChecked;
      //check if king selected
      let isKingSelected = current[y][x] instanceof King



      let startPos = this.state.pieceSelected;
      let endPos = { x: x, y: y }
      let isLegalMove = current[startPos.y][startPos.x].isLegalMove(current, startPos, endPos)
      if (isLegalMove && (!isKingChecked || isKingChecked === isKingSelected)) {
        //move piece and save
        let next = current.slice();
        next[endPos.y][endPos.x] = next[startPos.y][startPos.x];
        next[startPos.y][startPos.x] = null;

        //reset selected state and append new state and chenge turn
        this.setState({
          history: this.state.history.concat([next]),
          pieceSelected: { x: null, y: null, },
          isWhiteTurn: !this.state.isWhiteTurn,
        }, () => {
          //check if king is under attack
          for (let y = 0; y < 8;y++) {
            for (let x = 0; x < 8;x++) {
              if (next[y][x] instanceof King) {
                next[y][x].isUnderAttack(next, { x: x, y: y })
              }
            }
          }
          console.log(this.state.kingWhite.isChecked);
        })
      }
      else {
        //remove selected piece
        this.setState({
          pieceSelected: { x: null, y: null, },
        })
      }
    }
    else {
      //no piece selected

      //check check If Piece Is on Tile and the color of the turn
      if (this.checkIfPieceIsOnTile(x, y) && current[y][x].isWhite === this.state.isWhiteTurn) {
        //there is a piece

        //save piece
        this.setState({
          pieceSelected: { x: x, y: y, },
        })
      }
      else {
        //no piece
      }
    }

  }

  //check if piece is selected
  checkIfPieceSelected() {
    //check if piece selected is null
    if (this.state.pieceSelected.x != null && this.state.pieceSelected.y != null) {
      return true;
    }
    return false;
  }

  //check if there is chess piece on tile
  checkIfPieceIsOnTile(x, y) {
    let history = this.state.history; //get history of bopard
    let current = history[history.length - 1]; //get current board state

    //check if tile has piece
    if (current[y][x] instanceof Piece) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    //create board
    let turns = this.state.history;
    let currentTurn = turns[turns.length - 1]

    let tileComponents = [];
    let isWhite = true;
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        let tile = currentTurn[i][j]

        //check if there a piece on the board
        let piece = null;
        if (tile && !tile.isDead) {
          piece = tile;
        }

        tileComponents.push(<Tile
          key={j + "," + i}
          isWhite={isWhite}
          piece={piece}
          xPos={j}
          yPos={i}
          onClick={(x, y) => this.handleBoackClick(x, y)}
          highlight={this.state.pieceSelected.x === j && this.state.pieceSelected.y === i}
        />)

        isWhite = !isWhite
      }
      isWhite = !isWhite
    }

    return (
      <div className={'board'}>
        {tileComponents}
      </div>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Board />

  </React.StrictMode>,
  document.getElementById('root')
);
