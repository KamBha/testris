import { createGameBoard } from './model.js';
import { Piece } from './pieces/Piece.js';

let dataModel = createGameBoard({width: 10, height: 20});

var lastDropTime = 0;
function gameLoop(time) {
    dataModel.dropCurrentPieceDown(time);
    dataModel.checkPieceStatus(time);
    render(time);
    window.requestAnimationFrame(gameLoop);
}

function render(time) {
    document.getElementById('game').innerHTML = createTable(dataModel);

    function createTable(dataModel) {
        let tableStr = '<table>';
        for (let rowIdx = 0; rowIdx < dataModel.grid.length; rowIdx++) {
            let row = dataModel.grid[rowIdx];
            tableStr += '<tr>';
            for (let columnIdx = 0; columnIdx < row.length; columnIdx++) {
                if (dataModel.currentPiece.isPieceOnGridLocation(rowIdx, columnIdx)) {
                    tableStr += '<td width="10px" height="10px" class="' + dataModel.currentPiece.getColour() + '"></td>';
                }
                else if (dataModel.grid[rowIdx][columnIdx]) {
                    tableStr += '<td width="10px" height="10px" class="' + dataModel.grid[rowIdx][columnIdx] + '"></td>'
                }
                else {
                    tableStr += '<td width="10px" height="10px"></td>';
                }
            }
            tableStr += '</tr>';
        }
        tableStr += '</table>';
        var consoleHtml = document.getElementById('console');
        var data = 'isPieceLocked ' + dataModel.isPieceLocked(time) + '<br>'
        data += 'time' + time + '<br>';
        data += 'timeLocked' + dataModel.timeLocked + '<br>';
        data += 'cannot move down ' + dataModel.cannotMoveDown() + '<br>';
        consoleHtml.innerHTML = data;
        return tableStr;
    }
}

function onKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        dataModel.moveCurrentPieceLeft();
    }
    if (event.key === 'ArrowRight') {
        dataModel.moveCurrentPieceRight();
    }

    if (event.key === 'ArrowDown') {
        dataModel.togglePressDown();
        dataModel.moveCurrentPieceDown();
    }

    if (event.key === ' ') {
        dataModel.rotate();
    }
}

function onKeyUp(event) {
    if (event.key === 'ArrowDown') {
        dataModel.togglePressDown();
    }
}

document.addEventListener('keypress', onKeyPress);
document.addEventListener('keyup', onKeyUp);

gameLoop();