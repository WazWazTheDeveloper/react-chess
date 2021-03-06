import Piece from "./piece.js";
import queen_white from "../images/white/queen.png";
import queen_black from "../images/black/queen.png";
import King from "./king.js";

export default class Queen extends Piece{
    get src() {
        return this.isWhite ? queen_white : queen_black;
    };
}

Queen.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
        //get diffrence in tiles
        let difX = Math.abs(posStart.x - posEnd.x);
        let difY = Math.abs(posStart.y - posEnd.y);

        //check if going in vertical or horizontal
        let isVertical = difX === 0 && difY !== 0;
        let isHorizontal = difY === 0 && difX !== 0;

        //TODO:check if queen is moving diagonaly
        //TODO: check if queen is moving verticly/horizontaly

        //check if queen is moving in only one diraction
        if((isHorizontal && !isVertical) || (isVertical && !isHorizontal)) {
            let isSameColor = false;
            //check if tile is emplty and if not check is pieces have the same colors
            if(currentBoard[posEnd.y][posEnd.x] instanceof Piece) {
                isSameColor = currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite;
            }
            return !this.isPieceInWayStraight(currentBoard,posStart,posEnd,isHorizontal) && !isSameColor;
        }
        //check if queen is moving diagonaly
        else if (difX / difY === 1){
            //check if piece is not the same color as you
            if(currentBoard[posEnd.y][posEnd.x] instanceof Piece && currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite && !currentBoard[posEnd.y][posEnd.x] instanceof King) {
                return false;
            }
            else {
                //check if path is clear
                if(!currentBoard[posStart.y][posStart.x].isPieceInWayDiagonal(currentBoard,posStart,posEnd)) {
                    return true;
                }
            }
        }
        return false;
}

Queen.prototype.isPieceInWayDiagonal = function isPieceInWayDiagonal(currentBoard,posStart,posEnd) {

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

Queen.prototype.isPieceInWayStraight = function isPieceInWayStraight(currentBoard,posStart,posEnd,isHorizontal) {
    let m_posStart = isHorizontal ? posStart.x : posStart.y;
    let m_posEnd = isHorizontal ? posEnd.x : posEnd.y;
    let m_constOther = !isHorizontal ? posStart.x : posStart.y;
    //check is x and y are ascending or desending

    let m_asc = m_posStart < m_posEnd;

    //get starting x and y
    let m_temp = m_posStart

    //skip the current tile
    m_temp = m_asc ? m_temp+1 : m_temp-1;

    //check every tile
    while (m_temp !== m_posEnd) {

        if(isHorizontal) {
            if(currentBoard[m_constOther][m_temp]) {
                return true;
            }
        }
        else {
            if(currentBoard[m_temp][m_constOther]) {
                return true;
            }
        }

        //go to next tile
        m_temp = m_asc ? m_temp+1 : m_temp-1;
    }
    return false;
}