import Piece from "./piece.js";
import knight_black from "../images/black/knight.png";
import knight_white from "../images/white/knight.png";
import King from "./king.js";

export default class Knight extends Piece{
    get src() {
        return this.isWhite ? knight_white : knight_black;
    };
}

Knight.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    //get diffrence in tiles
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY = Math.abs(posStart.y - posEnd.y);

    //check if legalk move of knigt
    if((difX === 2 && difY === 1) || (difX === 1 && difY === 2)) {
        //check if piece is not the save color as you
        if(currentBoard[posEnd.y][posEnd.x] instanceof Piece && currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite && !currentBoard[posEnd.y][posEnd.x] instanceof King) {
            return false;
        }
        else {
            return true;
        }
    }
    return false;

}
