import Piece from "./piece.js";
import rook_black from "../images/black/rook.png";
import rook_white from "../images/white/rook.png";
import King from "./king.js";

export default class Rook extends Piece{
    get src() {
        return this.isWhite ? rook_white : rook_black;
    };
}

Rook.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    //get diffrence in tiles
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY =  Math.abs(posStart.y - posEnd.y);

    //check if piece is moving in what diraction
    let isVertical = difX === 0 && difY !== 0;
    let isHorizontal = difY === 0 && difX !== 0;

    //check if moving in only one diraction
    if((isHorizontal && !isVertical) || (isVertical && !isHorizontal)) {
        let isSameColor = false;
        //check if tile is emplty and if not check is pieces have the same colors
        if(currentBoard[posEnd.y][posEnd.x] instanceof Piece && !currentBoard[posEnd.y][posEnd.x] instanceof King) {
            isSameColor = currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite;
        }
        return !this.isPieceInWay(currentBoard,posStart,posEnd,isHorizontal) && !isSameColor;
    }

    return false;
}

Rook.prototype.isPieceInWay = function isPieceInWay(currentBoard,posStart,posEnd,isHorizontal) {
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