'use client';

import React from 'react';
import { GameState } from '@/types/tetris';

interface GameInfoProps {
  gameState: GameState;
  onRestart: () => void;
  onPause: () => void;
}

const GameInfo: React.FC<GameInfoProps> = ({ gameState, onRestart, onPause }) => {
  const { score, level, lines, isGameOver, isPaused } = gameState;

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-4">
      <div className="text-white">
        <div className="mb-2">
          <span className="text-lg font-bold">Score</span>
          <div className="text-2xl">{score.toLocaleString()}</div>
        </div>
        
        <div className="mb-2">
          <span className="text-lg font-bold">Level</span>
          <div className="text-xl">{level}</div>
        </div>
        
        <div className="mb-4">
          <span className="text-lg font-bold">Lines</span>
          <div className="text-xl">{lines}</div>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={onPause}
          disabled={isGameOver}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        
        <button
          onClick={onRestart}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Restart
        </button>
      </div>

      {isGameOver && (
        <div className="text-center">
          <div className="text-red-400 text-xl font-bold mb-2">Game Over!</div>
          <div className="text-white text-sm">Press Restart to play again</div>
        </div>
      )}

      {isPaused && !isGameOver && (
        <div className="text-center">
          <div className="text-yellow-400 text-xl font-bold">Paused</div>
        </div>
      )}

      <div className="text-white text-sm mt-6 space-y-1">
        <div className="font-bold mb-2">Controls:</div>
        <div>← → : Move</div>
        <div>↓ : Soft drop</div>
        <div>↑ : Rotate</div>
        <div>Space : Hard drop</div>
        <div>P : Pause</div>
      </div>
    </div>
  );
};

export default GameInfo;