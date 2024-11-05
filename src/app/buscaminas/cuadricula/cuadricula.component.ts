import { Component } from '@angular/core';
import { Cell } from '../cell';


@Component({
  selector: 'app-cuadricula',
  templateUrl: './cuadricula.component.html',
  styleUrls: ['./cuadricula.component.css']
})
export class CuadriculaComponent {
  rows: number = 5;
  cols: number = 5;
  board: Cell[][] = [];
  minesCount: number = 5;
  gridTemplateColumns: string = '';
  gameOver: boolean = false; // Nueva propiedad para el estado del juego

  generateBoard() {
    this.board = Array.from({ length: this.rows }, () => 
      Array.from({ length: this.cols }, () => ({
        hasMine: false,
        revealed: false,
        adjacentMines: 0
      }))
    );
    this.gridTemplateColumns = `repeat(${this.cols}, auto)`;
    this.placeMines();
    this.calculateAdjacentMines();
    this.gameOver = false; 
  }

  placeMines() {
    let placedMines = 0;
    while (placedMines < this.minesCount) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.cols);
      if (!this.board[row][col].hasMine) {
        this.board[row][col].hasMine = true;
        placedMines++;
      }
    }
  }

  calculateAdjacentMines() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (this.board[r][c].hasMine) continue;

        let adjacentMines = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = r + i;
            const newCol = c + j;
            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
              if (this.board[newRow][newCol].hasMine) {
                adjacentMines++;
              }
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
            newRow >= 0 && newRow < this.rows &&
            newCol >= 0 && newCol < this.cols &&
            !this.board[newRow][newCol].revealed &&
            !this.board[newRow][newCol].hasMine 
          ) {
            this.board[newRow][newCol].revealed = true;
          }
        }
      }
    }
  }
  
}
