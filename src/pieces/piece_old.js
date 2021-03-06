//black
import rook_black from "./images/black/rook.png";
import bishop_black from "./images/black/bishop.png";
import king_black from "./images/black/king.png";
import knight_black from "./images/black/knight.png";
import pwan_black from "./images/black/pwan.png";

//white
import rook_white from "./images/white/rook.png";
import bishop_white from "./images/white/bishop.png";
import king_white from "./images/white/king.png";
import knight_white from "./images/white/knight.png";


import Piece from "./pieces/piece.js";


export class Piece {
    constructor(isWhite) {
        this.isDead = false;
        this.isWhite = isWhite
    }
}

export class Rook extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
    }

    get src() {
        return this.isWhite ? rook_white : rook_black;
    };
}

export class Bishop extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
    }

    get src() {
        return this.isWhite ? bishop_white : bishop_black;
    };
}

export class King extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
    }

    get src() {
        return this.isWhite ? king_white : king_black;
    };
}

export class Knight extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
    }

    get src() {
        return this.isWhite ? knight_white : knight_black;
    };
}

export class Pwan extends Piece{
    constructor(x, y, isWhite){
        super(x, y, isWhite)
    }

    get src() {
        return this.isWhite ? pwan_white : pwan_black;
    };
}



