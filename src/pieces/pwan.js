import Piece from "./piece.js";
import pwan_black from "../images/black/pwan.png";
import pwan_white from "../images/white/pwan.png";

export default class Pwan extends Piece {
    constructor(isWhite) {
        super(isWhite)
        this.didFirstMove = false;
    }

    get src() {
        return this.isWhite ? pwan_white : pwan_black;
    };
}

//TODO: add final squre opeion to queen
//TODO: add En passant
Pwan.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    //get diffrence in tiles
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY = posStart.y - posEnd.y;
    //check is piece is white
    if(this.isWhite) {
        //reverce the x dif
        difY *= -1;
    }

    //check if piece is moving on x axis and if end tile is empty
    if(difX === 0 && !currentBoard[posEnd.y][posEnd.x] ) {
        if(difY === 1) {
            this.didFirstMove = true;
            return true;
        }
        if(difY === 2 && !this.didFirstMove) {
            let middleTileY = this.isWhite ? posStart.y + 1 : posStart.y -1; //get middle tile
            //check if middle tile is emply
            if(!currentBoard[middleTileY][posEnd.x]) {
                return true;
            }
        }
    }
    //check piece is moving on x asix and if end tile is enemy colored
    else if (difX === 1 && currentBoard[posEnd.y][posEnd.x] && currentBoard[posEnd.y][posEnd.x].isWhite !== this.isWhite) {
        //check if the piece want to move only one tile
        if(difY === 1){
            return true;
        }
    }


    return false;
    
}

Pwan.prototype.canEat = function canEat(currentBoard,posStart,posEnd) {
    //get diffrence in tiles
    let difX = Math.abs(posStart.x - posEnd.x);
    let difY = posStart.y - posEnd.y;
    //check is piece is white
    if(this.isWhite) {
        //reverce the x dif
        difY *= -1;
    }
    if (difX === 1 && difY === 1) {
        return true;
    }

    return false;
}