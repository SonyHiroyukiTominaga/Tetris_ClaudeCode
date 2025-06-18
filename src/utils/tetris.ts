import {
  TetrominoType,
  Tetromino,
  Position,
  GameState,
  TETROMINO_SHAPES,
  TETROMINO_COLORS,
  BOARD_WIDTH,
  BOARD_HEIGHT,
} from '@/types/tetris';

export function createEmptyBoard(): number[][] {
  return Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(0));
}

export function getRandomTetrominoType(): TetrominoType {
  const types: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  return types[Math.floor(Math.random() * types.length)];
}

export function createTetromino(type: TetrominoType): Tetromino {
  return {
    type,
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: -1 },
    rotation: 0,
    shape: TETROMINO_SHAPES[type][0],
    color: TETROMINO_COLORS[type],
  };
}

export function rotateTetromino(tetromino: Tetromino): Tetromino {
  const shapes = TETROMINO_SHAPES[tetromino.type];
  const newRotation = (tetromino.rotation + 1) % shapes.length;
  return {
    ...tetromino,
    rotation: newRotation,
    shape: shapes[newRotation],
  };
}

export function getTetrominoBlocks(tetromino: Tetromino): Position[] {
  const blocks: Position[] = [];
  for (let row = 0; row < tetromino.shape.length; row++) {
    for (let col = 0; col < tetromino.shape[row].length; col++) {
      if (tetromino.shape[row][col]) {
        blocks.push({
          x: tetromino.position.x + col,
          y: tetromino.position.y + row,
        });
      }
    }
  }
  return blocks;
}

export function isValidPosition(
  tetromino: Tetromino,
  board: number[][],
  offset: Position = { x: 0, y: 0 }
): boolean {
  const blocks = getTetrominoBlocks({
    ...tetromino,
    position: {
      x: tetromino.position.x + offset.x,
      y: tetromino.position.y + offset.y,
    },
  });

  for (const block of blocks) {
    if (
      block.x < 0 ||
      block.x >= BOARD_WIDTH ||
      block.y >= BOARD_HEIGHT ||
      (block.y >= 0 && board[block.y][block.x] !== 0)
    ) {
      return false;
    }
  }
  return true;
}

export function placeTetromino(tetromino: Tetromino, board: number[][]): number[][] {
  const newBoard = board.map(row => [...row]);
  const blocks = getTetrominoBlocks(tetromino);

  for (const block of blocks) {
    if (block.y >= 0 && block.y < BOARD_HEIGHT && block.x >= 0 && block.x < BOARD_WIDTH) {
      newBoard[block.y][block.x] = tetromino.type.charCodeAt(0);
    }
  }
  return newBoard;
}

export function clearLines(board: number[][]): { newBoard: number[][]; linesCleared: number } {
  const newBoard = board.filter(row => row.some(cell => cell === 0));
  const linesCleared = BOARD_HEIGHT - newBoard.length;

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }

  return { newBoard, linesCleared };
}

export function calculateScore(linesCleared: number, level: number): number {
  const baseScore = [0, 40, 100, 300, 1200];
  return baseScore[linesCleared] * level;
}

export function getDropTime(level: number): number {
  return Math.max(50, 1000 - (level - 1) * 100);
}

export function isGameOver(tetromino: Tetromino, board: number[][]): boolean {
  const blocks = getTetrominoBlocks(tetromino);
  
  for (const block of blocks) {
    if (block.y < 0) continue;
    if (block.y < BOARD_HEIGHT && block.x >= 0 && block.x < BOARD_WIDTH) {
      if (board[block.y][block.x] !== 0) {
        return true;
      }
    }
  }
  return false;
}

export function moveTetromino(
  tetromino: Tetromino,
  direction: 'left' | 'right' | 'down',
  board: number[][]
): Tetromino | null {
  const offset = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    down: { x: 0, y: 1 },
  }[direction];

  if (isValidPosition(tetromino, board, offset)) {
    return {
      ...tetromino,
      position: {
        x: tetromino.position.x + offset.x,
        y: tetromino.position.y + offset.y,
      },
    };
  }
  return null;
}

export function hardDrop(tetromino: Tetromino, board: number[][]): Tetromino {
  let newTetromino = tetromino;
  while (isValidPosition(newTetromino, board, { x: 0, y: 1 })) {
    newTetromino = {
      ...newTetromino,
      position: { x: newTetromino.position.x, y: newTetromino.position.y + 1 },
    };
  }
  return newTetromino;
}