import { PieceSelector } from "./pieces/PieceSelector.js";
import { Piece } from "./pieces/Piece.js";

export function createGameBoard(initialisationData) {
    let dm = {};
    const width = initialisationData.width ? initialisationData.width : 10;
    const height = initialisationData.height ? initialisationData.height : 20;
    const TIME_ALLOWED_FOR_SOFT_DROP = 5000;

    dm.grid = createGrid(height, width);
    dm.dropRate = 10000;
    dm.pieceSelector = new PieceSelector();

    dm.rotate = function rotate() {
        dm.currentPiece.rotate(dm.grid);
    }

    dm.init = function init() {
        dm.lastDropTime = 0;
        dm.pieceCannotMoveDown = false;
        dm.downPressed = false;
        dm.timeLocked = 0;
        dm.currentPiece = new Piece(0, 3, dm.pieceSelector.addNewSelection());
    }

    dm.dropCurrentPieceDown = function dropCurrentPieceDown(time) {
        if (!dm.downPressed && time > (dm.lastDropTime + dm.dropRate)) {
            dm.moveCurrentPieceDown();

            if (dm.cannotMoveDown()) {
                if (!dm.timeLocked)
                    dm.timeLocked = time;
            }
            else {
                dm.timeLocked = 0;
            }

            dm.lastDropTime = time;
        }
    }

    dm.moveCurrentPieceLeft = function moveCurrentPieceLeft() {
        if (!dm.currentPiece || dm.currentPiece.cannotMoveLeft(dm.grid)) {
            return;
        }
        dm.currentPiece.moveLeft();
    };
    dm.moveCurrentPieceRight = function moveCurrentPieceRight() {
        if (!dm.currentPiece || dm.currentPiece.cannotMoveRight(dm.grid)) {
            return;
        }
        dm.currentPiece.moveRight();
    };

    dm.moveCurrentPieceDown = function moveCurrentPieceDown() {
        if (dm.cannotMoveDown()) {
            return;
        }
        dm.pieceCannotMoveDown = false;
        dm.currentPiece.moveDown();
    }

    dm.checkPieceStatus = function checkPieceStatus(time) {
        if (dm.isPieceLocked(time)) {
            dm.addPieceToBoard();
        }
    }

    dm.addPieceToBoard = function addPieceToBoard() {
        var pieceAddedToGrid = dm.currentPiece;
        dm.currentPiece.getAllPositionsOccupiedByCurrentPiece().forEach(addPiece);
        dm.currentPiece = new Piece(0, 3, dm.pieceSelector.addNewSelection());

        function addPiece(location) {
            dm.grid[location.row][location.column] = pieceAddedToGrid.shapeSpecification.colour;
        }
    }

    dm.isPieceLocked = function isPieceLocked(time) {
        return dm.cannotMoveDown() && (dm.downPressed || time > (dm.timeLocked + TIME_ALLOWED_FOR_SOFT_DROP));
    }

    dm.cannotMoveDown = function cannotMoveDown() {
        return !dm.currentPiece || dm.currentPiece.cannotMoveDown(dm.grid);
    }

    dm.togglePressDown = function togglePressDown() {
        dm.downPressed = !dm.downPressed;
    }

    dm.init();

    return dm;
}

function createGrid(height, width) {
    // let grid = new Array(height);
    // for (let row = 0; row < height; row++) {
    //     grid[row] = new Array(width);
    // }
    // return grid;
    var x = 'yellow';
    var o = null;
    return [
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ o, o, o, o, o, o, o, o, o, o ],
        [ x, o, o, o, o, o, x, x, x, x ],
        [ x, o, o, o, o, o, o, x, x, x ],
        [ x, x, o, o, o, o, o, x, x, x ],
        [ x, x, x, o, o, o, x, x, x, x ],
        [ x, x, x, x, x, o, x, x, x, x ]
    ];
}