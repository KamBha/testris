export function Piece(pieceRow, pieceColumn, shapeSpecification) {
    // TODO: Rename to boundingBoxRowPosition
    this.pieceRowPosition = pieceRow; // Counterintiuitively, this can be a number greater than the grid size
    // TODO: Rename to boundingBoxColumnPosition
    this.pieceColumnPosition = pieceColumn; // Counterintiuitively, this can be below zero or greater than the row size
    // this.shape = [
    //                 [1, 0],
    //                 [1, 0],
    //                 [1, 1],
    //              ];
    // this.shape = [
    //                 [0, 1, 0],
    //                 [1, 1, 1],
    //                 [0, 0, 0]
    //              ];

    this.rotationPosition = 0;

    // this.shapeSpecification = {
    //     rotationSpecification: [
    //         [
    //             [1, 0, 0, 0],
    //             [1, 0, 0, 0],
    //             [1, 0, 0, 0],
    //             [1, 0, 0, 0],
    //         ],
    //         [
    //             [0, 0, 0, 0],
    //             [0, 0, 0, 0],
    //             [1, 1, 1, 1],
    //             [0, 0, 0, 0],
    //         ]
    //     ],
    //     colour: 'cyan'
    // };

    this.shapeSpecification = {
        rotationSpecification: [
            [
                [ 0, 1, 0 ],
                [ 0, 1, 0 ],
                [ 0, 1, 1 ],
            ],
            [
                [ 0, 0, 0 ],
                [ 1, 1, 1 ],
                [ 1, 0, 0 ],
            ],

            [
                [ 1, 1, 0 ],
                [ 0, 1, 0 ],
                [ 0, 1, 0 ],
            ],

            [
                [ 0, 0, 1 ],
                [ 1, 1, 1 ],
                [ 0, 0, 0 ],
            ],
        ],
        colour: 'cyan'
    };

    this.isPieceOnGridLocation = function isPieceOnGridLocation(row, column) {
        if (!isGridLocationInBoundingBox(this, this.retrieveCurrentShape(), row, column)) {
            return false;
        }
        return this.retrieveCurrentShape()[row - this.pieceRowPosition][column - this.pieceColumnPosition];
    };

    this.getColour = function getColour() {
        return this.shapeSpecification.colour;
    }

    this.cannotMoveLeft = function cannotMoveLeft(grid) {
        for (let gridPosition of
                            getAllPositionsOccupiedByPiece(this.retrieveCurrentShape(), this.pieceRowPosition, this.pieceColumnPosition)) {
            if (gridPosition.column - 1 < 0 || grid[gridPosition.row][gridPosition.column - 1])
                return true;
        }
        return false;
    }

    this.rotate = function rotate(grid) {
        let newRotationPosition =
                        this.rotationPosition !== this.shapeSpecification.rotationSpecification.length - 1 ? this.rotationPosition + 1 : 0;
        let newShape = retrieveShape(this.shapeSpecification, newRotationPosition);

        let newPieceColumnPosition = this.pieceColumnPosition;

        let columnPositionsOverRight = new Set();
        for (let gridPosition of getAllPositionsOccupiedByPiece(newShape, this.pieceRowPosition, this.pieceColumnPosition)) {
            if (gridPosition.column < 0) {
               newPieceColumnPosition = 0;
               break;
            }
            if (gridPosition.column >= grid[0].length) {
                columnPositionsOverRight.add(gridPosition.column);
            }
        }

        if (columnPositionsOverRight.size > 0)
            newPieceColumnPosition -= columnPositionsOverRight.size;

        // Check rotation allowed
        for (let gridPosition of getAllPositionsOccupiedByPiece(newShape, this.pieceRowPosition, newPieceColumnPosition)) {
            if (grid[gridPosition.row][gridPosition.column]) {
                return;
            }
        }

        this.rotationPosition = newRotationPosition;
        this.pieceColumnPosition = newPieceColumnPosition;
    }

    this.cannotMoveRight = function cannotMoveRight(grid) {
        for (let gridPosition of
                            getAllPositionsOccupiedByPiece(this.retrieveCurrentShape(), this.pieceRowPosition, this.pieceColumnPosition)) {
            if (gridPosition.column + 1 == grid[0].length || grid[gridPosition.row][gridPosition.column + 1])
                return true;
        }
        return false;
    }

    this.cannotMoveDown = function cannotMoveDown(grid) {
        for (let gridPosition of
                            getAllPositionsOccupiedByPiece(this.retrieveCurrentShape(), this.pieceRowPosition, this.pieceColumnPosition)) {
            if (gridPosition.row + 1 == grid.length || grid[gridPosition.row + 1][gridPosition.column])
                return true;
        }
        return false;
    }

    this.moveDown = function moveDown() {
        this.pieceRowPosition += 1;
    }

    this.moveLeft = function moveLeft() {
        this.pieceColumnPosition -= 1;
    }

    this.moveRight = function moveRight() {
        this.pieceColumnPosition += 1;
    }

    this.retrieveCurrentShape = function retrieveCurrentShape() {
        return retrieveShape(this.shapeSpecification, this.rotationPosition);
    };

    function retrieveShape(shapeSpecification, rotationPosition) {
        return shapeSpecification.rotationSpecification[rotationPosition]
    }

    /**
     * Assumes that piece does not intersect grid, but bounding box may and the bounding box shape is defined as a square.
     */
    function getAllPositionsOccupiedByPiece(shape, pieceRowPosition, pieceColumnPosition) {
        let positionsOccupiedByPiece = [];
        for (let row = 0; row < shape.length; row++) {
            for (let column = 0; column < shape.length; column++) {
                if (shape[row][column]) {
                    positionsOccupiedByPiece.push({row : pieceRowPosition + row, column: pieceColumnPosition + column});
                }
            }
        }

        return positionsOccupiedByPiece;
    }

    function isGridLocationInBoundingBox(piece, shape, row, column) {
        return (
            row >= piece.pieceRowPosition &&
            row <= (piece.pieceRowPosition + shape.length - 1) &&
            column >= piece.pieceColumnPosition &&
            column <= (piece.pieceColumnPosition + shape[0].length - 1)
        );
    }
}