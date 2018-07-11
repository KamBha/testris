# Notes
Start application:-
set DEBUG=testris:*
npm start

# Day 1
Setup Express app
Implement grid and move square piece left and right.
Worked out size of tetris board- Found this:- http://tetris.wikia.com/wiki/Tetris_Guideline via https://stackoverflow.com/questions/2410485/is-there-a-standard-size-for-the-tetris-grid

# Day 2
Implemented drop
Need to rethink to how to detect that piece should be part of grid.

# Day 3
Updated to support different pieces. Investigating rotation:-
https://strategywiki.org/wiki/File:Tetris_rotation_Nintendo.png
Set the piece size to be simple, but I am thinking that for rotation purposes, we may need to consider a square to represent the shape. Either
4 X 4 for long line and square or 3 x 3 for all other shapes. Easier to rotate around a centre. This way, regardless or orientation, the starting
row and column for the bounding box does not change.

#Day 4
Updated to support grid checking on the bounding box. The calculation is slightly inefficient, but the number of iterations are so low, I don't care.

Implemented a wall kick algorithm that only applies to the walls (http://tetris.wikia.com/wiki/TGM_rotation).

Need to think through how this rotation should work.

# Day 5
This is better:-
http://tetris.wikia.com/wiki/Tetris_Guideline

Based on this, I would:-
* allow rotation through blocks.
* allow 500 ms drop
* follow some of the rules

# Day 6
Gave up on the idea of generifying rotation using algorithm. It was broken by long piece.

Switched to new Piece class which represented all possible rotations. Found problem with long piece rotation on right hand side. Decided to use a
set to determine what column pieces were over the RHS and use the size to determine how many places to move the piece.

# Day 7
Implemented code to determine if piece now locked in. Implemneted console on HTML.

