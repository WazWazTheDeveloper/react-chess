export default class Piece {
    constructor(isWhite) {
        this.isDead = false;
        this.isWhite = isWhite
    }
}

Piece.prototype.isLegalMove = function isLegalMove(currentBoard,posStart,posEnd) {
    return false;
}

Piece.prototype.canEat = function canEat(currentBoard,posStart,posEnd) {
    return this.isLegalMove(currentBoard,posStart,posEnd);
}