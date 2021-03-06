import Piece from "./piece.js";
import king_black from "../images/black/king.png";
import king_white from "../images/white/king.png";

export default class King extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
        this.didCastle = false;
        this.isChecked = false;
    }

    get src() {
        return this.isWhite ? king_white : king_black;
    };
}

//TODO: check for mate legalness
//TODO: addCastle
King.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    //get diffrence in tiles
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY = Math.abs(posStart.y - posEnd.y);
    if(difX <= 1 && difY <= 1) {
        //check if endpos in empty or other color
        if(!(currentBoard[posEnd.y][posEnd.x] && currentBoard[posEnd.y][posEnd.x].isWhite === this.isWhite)) {
            return !this.isUnderAttack(currentBoard,posEnd);
        }
    }
    return false;
}

King.prototype.isUnderAttack = function isUnderAttack(currentBoard,kingPos) {
    //loop to check if any piece will attack the king in kingPos
    for(var y = 0 ; y < currentBoard.length; y++) {
        for(var x = 0 ; x < currentBoard[y].length; x++) {
            //check if is piece and other color
            if(currentBoard[y][x] instanceof Piece && currentBoard[y][x].isWhite !== this.isWhite) {
                if(currentBoard[y][x] instanceof King) {
                    if(Math.abs(kingPos.x - x) <= 1 && Math.abs(kingPos.y - y) <= 1){
                        this.isChecked = true;
                        return true
                    }
                }
                let piecePos = {x:x,y:y}; //get pos of piece
                if(currentBoard[y][x].canEat(currentBoard,piecePos,kingPos)) {
                    this.isChecked = true;
                    return true;
                }
            }
        }  
    }
    this.isChecked = false;
    return false;
}