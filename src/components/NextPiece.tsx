'use client';

import React from 'react';
import { Tetromino } from '@/types/tetris';

interface NextPieceProps {
  nextPiece: Tetromino | null;
}

const NextPiece: React.FC<NextPieceProps> = ({ nextPiece }) => {
  if (!nextPiece) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-white text-lg mb-2">Next</h3>
        <div className="w-20 h-20 bg-gray-900 border border-gray-600"></div>
      </div>
    );
  }

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

  const renderShape = () => {
    return nextPiece.shape.map((row, rowIndex) => (
      <div key={rowIndex} className="flex">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-4 h-4 border border-gray-600 ${
              cell ? getCellColor(nextPiece.type) : 'bg-gray-900'
            }`}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white text-lg mb-2">Next</h3>
      <div className="inline-block">
        {renderShape()}
      </div>
    </div>
  );
};

export default NextPiece;