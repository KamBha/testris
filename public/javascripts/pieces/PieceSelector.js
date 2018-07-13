export function PieceSelector() {
    const MAX_DISPLAYED_ITEMS = 3;
    const ALL_PIECES = [
        {
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
            colour: 'orange'
        },
        {
            rotationSpecification: [
                [
                    [ 0, 1, 0 ],
                    [ 0, 1, 0 ],
                    [ 1, 1, 0 ],
                ],
                [
                    [ 1, 0, 0 ],
                    [ 1, 1, 1 ],
                    [ 0, 0, 0 ],
                ],
    
                [
                    [ 0, 1, 1 ],
                    [ 0, 1, 0 ],
                    [ 0, 1, 0 ],
                ],
    
                [
                    [ 0, 0, 0 ],
                    [ 1, 1, 1 ],
                    [ 0, 0, 1 ],
                ],
            ],
            colour: 'blue'
        },
        {
            rotationSpecification: [
                [
                    [ 0, 0, 0 ],
                    [ 1, 1, 0 ],
                    [ 0, 1, 1 ],
                ],
                [
                    [ 0, 0, 1 ],
                    [ 0, 1, 1 ],
                    [ 0, 1, 0 ]
                ],
            ],
            colour: 'red'
        },
        {
            rotationSpecification: [
                [
                    [ 0, 0, 0 ],
                    [ 0, 1, 1 ],
                    [ 1, 1, 0 ],
                ],
                [
                    [ 0, 0, 1 ],
                    [ 0, 1, 1 ],
                    [ 0, 1, 0 ]
                ],
            ],
            colour: 'green'
        },
        {
            rotationSpecification: [
                [
                    [ 0, 0, 0 ],
                    [ 1, 1, 1 ],
                    [ 0, 1, 0 ],
                ],
                [
                    [ 0, 1, 0 ],
                    [ 1, 1, 0 ],
                    [ 0, 1, 0 ]
                ],
                [
                    [ 0, 1, 0 ],
                    [ 1, 1, 1 ],
                    [ 0, 0, 0 ]
                ],
                [
                    [ 0, 1, 0 ],
                    [ 0, 1, 1 ],
                    [ 0, 1, 0 ]
                ],
            ],
            colour: 'purple'
        },
        {
            rotationSpecification: [
                [
                    [ 0, 0, 0, 0 ],
                    [ 0, 0, 0, 0 ],
                    [ 1, 1, 1, 1 ],
                    [ 0, 0, 0, 0 ]
                ],
                [
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 1, 0 ],
                    [ 0, 0, 1, 0 ]
                ],
            ],
            colour: 'cyan'
        },
        {
            rotationSpecification: [
                [
                    [ 1, 1 ],
                    [ 1, 1 ],
                ]
            ],
            colour: 'yellow'
        },
    ];

    this.selections = initSelection();

    this.returnNextSelections = function returnNextSelections() {
        return this.selections.map(function (selection) { return ALL_PIECES[selection]; }); 
    }

    this.addNewSelection = function addNewSelection() {
        var newPiece = this.selections.shift();
        this.selections.push(generateOption());
        return ALL_PIECES[newPiece];
    }

    function initSelection() {
        var selection = [];

        for (var idx = 0; idx <= MAX_DISPLAYED_ITEMS; idx++) {
            selection.push(generateOption());
        }

        return selection;
    }

    function generateOption() {
        return Math.floor(Math.random() * ALL_PIECES.length);
    }
}