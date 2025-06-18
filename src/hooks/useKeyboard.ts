'use client';

import { useEffect, useRef } from 'react';

interface KeyboardActions {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  drop: () => void;
  pause: () => void;
  restart: () => void;
}

export const useKeyboard = (actions: KeyboardActions, enabled: boolean = true) => {
  const keysPressed = useRef<Set<string>>(new Set());
  const keyRepeatTimers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      if (keysPressed.current.has(key)) return;
      
      keysPressed.current.add(key);
      keyRepeatTimers.current.set(key, Date.now());

      switch (key) {
        case 'arrowleft':
        case 'a':
          event.preventDefault();
          actions.moveLeft();
          break;
        case 'arrowright':
        case 'd':
          event.preventDefault();
          actions.moveRight();
          break;
        case 'arrowdown':
        case 's':
          event.preventDefault();
          actions.moveDown();
          break;
        case 'arrowup':
        case 'w':
          event.preventDefault();
          actions.rotate();
          break;
        case ' ':
          event.preventDefault();
          actions.drop();
          break;
        case 'p':
          event.preventDefault();
          actions.pause();
          break;
        case 'r':
          event.preventDefault();
          actions.restart();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      keysPressed.current.delete(key);
      keyRepeatTimers.current.delete(key);
    };

    const handleKeyRepeat = () => {
      const now = Date.now();
      
      keysPressed.current.forEach(key => {
        const pressTime = keyRepeatTimers.current.get(key);
        if (!pressTime) return;
        
        const elapsed = now - pressTime;
        const shouldRepeat = elapsed > 150 && (elapsed - 150) % 50 < 16;
        
        if (shouldRepeat) {
          switch (key) {
            case 'arrowleft':
            case 'a':
              actions.moveLeft();
              break;
            case 'arrowright':
            case 'd':
              actions.moveRight();
              break;
            case 'arrowdown':
            case 's':
              actions.moveDown();
              break;
          }
        }
      });
    };

    const intervalId = setInterval(handleKeyRepeat, 16);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(intervalId);
      keysPressed.current.clear();
      keyRepeatTimers.current.clear();
    };
  }, [actions, enabled]);
};