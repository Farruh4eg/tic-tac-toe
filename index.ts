const board: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
];

function availableMoves(board: string[][]) {
  const moves: number[][] = [];
  board.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col != 'x' && col != 'o') {
        moves.push([i, j]);
      }
    });
  });

  return moves;
}

function hasWon(board: string[][], player: string) {
  board.forEach((row) => {
    if (row.filter((x) => x === player).length === 3) return true;
  });

  for (let i = 0; i < 3; ++i) {
    if (
      board[0][i] === player &&
      board[1][i] === player &&
      board[2][i] === player
    )
      return true;
  }

  if (
    board[0][0] === player &&
    board[1][1] === player &&
    board[2][2] === player
  )
    return true;
  if (
    board[0][2] === player &&
    board[1][1] === player &&
    board[2][0] === player
  )
    return true;

  return false;
}

function doMove(board: string[][], move: number[], player: string) {
  const row = move[0];
  const col = move[1];

  if (board[row][col] != 'x' && board[row][col] != 'o') {
    board[row][col] = player;
    return true;
  }

  return false;
}

function isGameOver(board: string[][]) {
  if (
    hasWon(board, 'x') ||
    hasWon(board, 'o') ||
    availableMoves(board).length === 0
  ) {
    return true;
  }

  return false;
}

function evaluate(board: string[][]) {
  if (hasWon(board, 'x')) return 1;
  if (hasWon(board, 'o')) return -1;

  return 0;
}

function minimax(
  inBoard: string[][],
  isMaximizing: boolean,
  depth: number
): [number, number[]] {
  if (depth === 0 || isGameOver(inBoard)) return [evaluate(inBoard), []];

  let bestMove: number[] = [];
  let bestValue: number;
  let symbol: string;

  if (isMaximizing) {
    bestValue = -Infinity;
    symbol = 'x';
  } else {
    bestValue = Infinity;
    symbol = 'o';
  }

  availableMoves(inBoard).forEach((move) => {
    const newBoard = structuredClone(inBoard);
    doMove(newBoard, move, symbol);
    let hypotheticalValue = minimax(newBoard, !isMaximizing, depth - 1)[0];

    if (
      (isMaximizing && hypotheticalValue > bestValue) ||
      (!isMaximizing && hypotheticalValue < bestValue)
    ) {
      bestValue = hypotheticalValue;
      bestMove = move;
    }
  });

  return [bestValue, bestMove];
}

function main() {
  console.log(board);

  let flag = true;
  for (let i = 0; i < 9; ++i) {
    let symbol = flag ? 'x' : 'o';
    switch (flag) {
      case true:
        symbol = 'x';
        break;
      default:
        symbol = 'o';
    }

    const [bestValue, bestMove] = minimax(board, flag, 5);

    if (bestMove.length === 0) {
      break;
    }

    doMove(board, bestMove, symbol);

    if (isGameOver(board)) {
      if (hasWon(board, 'x')) {
        console.log('x won');
      } else if (hasWon(board, 'o')) {
        console.log('y won');
      } else {
        console.log('draw');
      }
      break;
    }

    flag = !flag;
  }

  console.log(board);
}

main();
