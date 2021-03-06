import Piece from "./piece.js";
import bishop_white from "../images/white/bishop.png";
import bishop_black from "../images/black/bishop.png";
import King from "./king.js";

export default class Bishop extends Piece{
    get src() {
        return this.isWhite ? bishop_white : bishop_black;
    };
}

Bishop.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY = Math.abs(posStart.y - posEnd.y);

    //check if legalk move of knigt
    if(difX / difY === 1) {
        //check if piece is not the same color as you
        if(currentBoard[posEnd.y][posEnd.x] instanceof Piece && currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite && !currentBoard[posEnd.y][posEnd.x] instanceof King) {
            return false;
        }
        else {
            //check if path is clear
            if(!currentBoard[posStart.y][posStart.x].isPieceInWay(currentBoard,posStart,posEnd)) {
                return true;
            }
        }
    }
    return false;
}

Bishop.prototype.isPieceInWay = function isPieceInWay(currentBoard,posStart,posEnd) {

    //check is x and y are ascending or desending
    let ascX = posStart.x < posEnd.x;
    let ascY = posStart.y < posEnd.y;

    //get starting x and y
    let tempX = posStart.x
    let tempY = posStart.y

    //skip the current tile
    tempX = ascX ? tempX+1 : tempX-1;
    tempY = ascY ? tempY+1 : tempY-1;

    //check every tile
    while (tempX !== posEnd.x) {
        if(currentBoard[tempY][tempX]) { //check if tile is not empty and is a piece  deleted:&& currentBoard[tempX][tempY] instanceof Piece
            return true;
        }

        //go to next tile
        tempX = ascX ? tempX+1 : tempX-1;
        tempY = ascY ? tempY+1 : tempY-1;
    }
    return false;
}