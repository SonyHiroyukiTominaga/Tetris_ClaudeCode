'use client';

import React from 'react';
import { GameState, BOARD_WIDTH, BOARD_HEIGHT } from '@/types/tetris';
import { getTetrominoBlocks } from '@/utils/tetris';

interface TetrisBoardProps {
  gameState: GameState;
}

const TetrisBoard: React.FC<TetrisBoardProps> = ({ gameState }) => {
  const { board, currentPiece } = gameState;

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    if (currentPiece) {
      const blocks = getTetrominoBlocks(currentPiece);
      blocks.forEach(({ x, y }) => {
        if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
          displayBoard[y][x] = currentPiece.type.charCodeAt(0);
        }
      });
    }

    return displayBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => {
          let cellColor = 'bg-gray-900';
          
          if (cell !== 0) {
            const tetrominoType = String.fromCharCode(cell);
            cellColor = getCellColor(tetrominoType);
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-6 h-6 border border-gray-600 ${cellColor}`}
            />
          );
        })}
      </div>
    ));
  };

  const getCellColor = (type: string): string => {
    const colors: Record<string, string> = {
      'I': 'bg-cyan-400',
      'O': 'bg-yellow-400',
      'T': 'bg-purple-400',
      'S': 'bg-green-400',
      'Z': 'bg-red-400',
      'J': 'bg-blue-400',
      'L': 'bg-orange-400',
    };
    return colors[type] || 'bg-gray-400';
  };

  return (
    <div className="inline-block border-2 border-gray-300 bg-black p-2">
      {renderBoard()}
    </div>
  );
};

export default TetrisBoard;