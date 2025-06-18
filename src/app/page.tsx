'use client';

import React from 'react';
import TetrisBoard from '@/components/TetrisBoard';
import NextPiece from '@/components/NextPiece';
import GameInfo from '@/components/GameInfo';
import { useTetris } from '@/hooks/useTetris';
import { useKeyboard } from '@/hooks/useKeyboard';

export default function Home() {
  const { gameState, actions } = useTetris();
  
  useKeyboard(actions, true);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white text-center">Tetris</h1>
          <TetrisBoard gameState={gameState} />
        </div>
        
        <div className="flex flex-col gap-4">
          <NextPiece nextPiece={gameState.nextPiece} />
          <GameInfo 
            gameState={gameState}
            onRestart={actions.restart}
            onPause={actions.pause}
          />
        </div>
      </div>
    </div>
  );
}
