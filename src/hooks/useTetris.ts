'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GameState,
  Tetromino,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from '@/types/tetris';
import {
  createEmptyBoard,
  getRandomTetrominoType,
  createTetromino,
  rotateTetromino,
  isValidPosition,
  placeTetromino,
  clearLines,
  calculateScore,
  getDropTime,
  isGameOver,
  moveTetromino,
  hardDrop,
} from '@/utils/tetris';

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: null,
    nextPiece: null,
    score: 0,
    level: 1,
    lines: 0,
    isGameOver: false,
    isPaused: false,
  }));

  const dropTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const initializeGame = useCallback(() => {
    const firstPiece = createTetromino(getRandomTetrominoType());
    const secondPiece = createTetromino(getRandomTetrominoType());
    
    setGameState({
      board: createEmptyBoard(),
      currentPiece: firstPiece,
      nextPiece: secondPiece,
      score: 0,
      level: 1,
      lines: 0,
      isGameOver: false,
      isPaused: false,
    });
  }, []);




  const moveLeft = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const movedPiece = moveTetromino(prev.currentPiece, 'left', prev.board);
      return movedPiece ? { ...prev, currentPiece: movedPiece } : prev;
    });
  }, []);

  const moveRight = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const movedPiece = moveTetromino(prev.currentPiece, 'right', prev.board);
      return movedPiece ? { ...prev, currentPiece: movedPiece } : prev;
    });
  }, []);

  const moveDown = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const movedPiece = moveTetromino(prev.currentPiece, 'down', prev.board);
      if (movedPiece) {
        return { ...prev, currentPiece: movedPiece, score: prev.score + 1 };
      } else {
        if (!prev.nextPiece) return prev;
        
        const newBoard = placeTetromino(prev.currentPiece, prev.board);
        const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
        const scoreIncrease = calculateScore(linesCleared, prev.level);
        const newLines = prev.lines + linesCleared;
        const newLevel = Math.floor(newLines / 10) + 1;
        
        const newNextPiece = createTetromino(getRandomTetrominoType());
        const newCurrentPiece = prev.nextPiece;
        
        const gameOver = isGameOver(newCurrentPiece, clearedBoard);
        
        return {
          ...prev,
          board: clearedBoard,
          score: prev.score + scoreIncrease,
          level: newLevel,
          lines: newLines,
          currentPiece: gameOver ? null : newCurrentPiece,
          nextPiece: newNextPiece,
          isGameOver: gameOver,
        };
      }
    });
  }, []);

  const rotate = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused) return prev;
      
      const rotatedPiece = rotateTetromino(prev.currentPiece);
      if (isValidPosition(rotatedPiece, prev.board)) {
        return { ...prev, currentPiece: rotatedPiece };
      }
      return prev;
    });
  }, []);

  const drop = useCallback(() => {
    setGameState(prev => {
      if (!prev.currentPiece || prev.isGameOver || prev.isPaused || !prev.nextPiece) return prev;
      
      const droppedPiece = hardDrop(prev.currentPiece, prev.board);
      const dropDistance = droppedPiece.position.y - prev.currentPiece.position.y;
      
      const newBoard = placeTetromino(droppedPiece, prev.board);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      const scoreIncrease = calculateScore(linesCleared, prev.level);
      const newLines = prev.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10) + 1;
      
      const newNextPiece = createTetromino(getRandomTetrominoType());
      const newCurrentPiece = prev.nextPiece;
      
      const gameOver = isGameOver(newCurrentPiece, clearedBoard);
      
      return {
        ...prev,
        board: clearedBoard,
        score: prev.score + scoreIncrease + dropDistance * 2,
        level: newLevel,
        lines: newLines,
        currentPiece: gameOver ? null : newCurrentPiece,
        nextPiece: newNextPiece,
        isGameOver: gameOver,
      };
    });
  }, []);

  const pause = useCallback(() => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  const restart = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    const gameLoop = (timestamp: number) => {
      if (gameState.isGameOver || gameState.isPaused || !gameState.currentPiece) {
        requestAnimationFrame(gameLoop);
        return;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      dropTimeRef.current += deltaTime;
      
      const dropTime = getDropTime(gameState.level);
      
      if (dropTimeRef.current > dropTime) {
        moveDown();
        dropTimeRef.current = 0;
      }
      
      lastTimeRef.current = timestamp;
      requestAnimationFrame(gameLoop);
    };

    if (gameState.currentPiece) {
      requestAnimationFrame(gameLoop);
    }
  }, [gameState.isGameOver, gameState.isPaused, gameState.currentPiece, gameState.level, moveDown]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    actions: {
      moveLeft,
      moveRight,
      moveDown,
      rotate,
      drop,
      pause,
      restart,
    },
  };
};