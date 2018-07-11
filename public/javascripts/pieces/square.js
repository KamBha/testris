export function Square(pieceRow, pieceColumn) {
    this.colour = 'yellow';
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

    this.shape = [
                    [1],
                    [1],
                    [1],
                    [1]
                 ];
    this.isPieceOnGridLocation = function isPieceOnGridLocation(row, column) {
        if (!isGridLocationInBoundingBox(this, row, column))
            return false;
        return this.shape[row - this.pieceRowPosition][column - this.pieceColumnPosition];
    };

    this.cannotMoveLeft = function cannotMoveLeft(grid) {
        for (let gridPosition of getAllPositionsOccupiedByPiece(this)) {
            if (gridPosition.column - 1 < 0 || grid[gridPosition.row][gridPosition.column - 1])
                return true;
        }
        return false;
    }

    this.rotate = function rotate(grid) {
        let newShape = createEmptyShape(this.shape.length);

        for (let row = 0; row < this.shape.length; row++) {
            for (let column = 0; column < this.shape.length; column++) {
                newShape[column][this.shape.length - row - 1] = this.shape[row][column];
            }
        }

        let newPieceColumnPosition = this.pieceColumnPosition;

        let newPiece = { pieceRowPosition: this.pieceRowPosition, pieceColumnPosition: this.pieceColumnPosition, shape: newShape };

        for (let gridPosition of getAllPositionsOccupiedByPiece(newPiece)) {
            if (gridPosition.column < 0)
               newPieceColumnPosition = 0;
            if (gridPosition.column >= grid[0].length)
                newPieceColumnPosition -= gridPosition.column - (grid[0].length - 1);
        }

        // Check rotation allowed
        newPiece = { pieceRowPosition: this.pieceRowPosition, pieceColumnPosition: newPieceColumnPosition, shape: newShape };
        for (let gridPosition of getAllPositionsOccupiedByPiece(newPiece)) {
            if (grid[gridPosition.row][gridPosition.column]) {
                return;
            }
        }

        this.shape = newShape;
        this.pieceColumnPosition = newPieceColumnPosition;
    }

    this.cannotMoveRight = function cannotMoveRight(grid) {
        for (let gridPosition of getAllPositionsOccupiedByPiece(this)) {
            if (gridPosition.column + 1 == grid[0].length || grid[gridPosition.row][gridPosition.column + 1])
                return true;
        }
        return false;
    }

    this.cannotMoveDown = function cannotMoveDown(grid) {
        for (let gridPosition of getAllPositionsOccupiedByPiece(this)) {
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

    /**
     * Assumes that piece does not intersect grid, but bounding box may and the bounding box shape is defined as a square.
     */
    function getAllPositionsOccupiedByPiece(piece) {
        let positionsOccupiedByPiece = [];
        for (let row = 0; row < piece.shape.length; row++) {
            for (let column = 0; column < piece.shape.length; column++) {
                if (piece.shape[row][column]) {
                    positionsOccupiedByPiece.push({row : piece.pieceRowPosition + row, column: piece.pieceColumnPosition + column});
                }
            }
        }

        return positionsOccupiedByPiece;
    }

    function isGridLocationInBoundingBox(piece, row, column) {
        return (
            row >= piece.pieceRowPosition &&
            row <= (piece.pieceRowPosition + piece.shape.length - 1) &&
            column >= piece.pieceColumnPosition &&
            column <= (piece.pieceColumnPosition + piece.shape[0].length - 1)
        );
    }

    function createEmptyShape(size) {
        let shape = new Array(size);
        for (let row = 0; row < size; row++) {
            shape[row] = (new Array(size));
        }
        return shape;
    }
}