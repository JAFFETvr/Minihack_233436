import { Component } from '@angular/core';
import { Cell } from '../cell';

@Component({
  selector: 'app-cuadricula',
  templateUrl: './cuadricula.component.html',
  styleUrls: ['./cuadricula.component.css']
})
export class CuadriculaComponent {
  minesCount: number = 2;
  board: Cell[][] = [];
  gridTemplateColumns: string = '';
  gameOver: boolean = false;

  generateBoard() {
    const dimension = this.minesCount * 2;

    this.board = Array.from({ length: dimension }, () => 
      Array.from({ length: dimension }, () => ({
        hasMine: false,
        revealed: false,
        adjacentMines: 0
      }))
    );

    this.gridTemplateColumns = `repeat(${dimension}, auto)`;
    this.placeMines();
    this.calculateAdjacentMines();
    this.gameOver = false;
  }

  placeMines() {
    let placedMines = 0;
    while (placedMines < this.minesCount) {
      const row = Math.floor(Math.random() * this.board.length);
      const col = Math.floor(Math.random() * this.board[0].length);
      if (!this.board[row][col].hasMine) {
        this.board[row][col].hasMine = true;
        placedMines++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board[r].length; c++) {
        if (this.board[r][c].hasMine) continue;

        let adjacentMines = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (
              newRow >= 0 && newRow < this.board.length &&
              newCol >= 0 && newCol < this.board[r].length &&
              this.board[newRow][newCol].hasMine
            ) {
              adjacentMines++;
            }
          }
        }
        this.board[r][c].adjacentMines = adjacentMines;
      }
    }
  }

  revealCell(row: number, col: number) {
    if (this.board[row][col].revealed || this.gameOver) return;

    if (this.board[row][col].hasMine) {
      this.gameOver = true;
      return;
    }

    this.board[row][col].revealed = true;

    if (this.board[row][col].adjacentMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;

          if (
            newRow >= 0 && newRow < this.board.length &&
            newCol >= 0 && newCol < this.board[row].length &&
            !this.board[newRow][newCol].revealed &&
            !this.board[newRow][newCol].hasMine 
          ) {
            this.revealCell(newRow, newCol);
          }
        }
      }
    }
  }
}
