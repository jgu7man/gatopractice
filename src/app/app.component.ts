import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  player: PLAYER = 'O';
  winner?: PLAYER;
  pX: string[] = [];
  pO: string[] = [];
  turnCount: number = 0;

  selectBox(player: PLAYER, row: number, col: number) {
    ++this.turnCount;
    this.player = player == 'X' ? 'O' : 'X';
    player == 'X'
      ? this.pX.push(`${row},${col}`)
      : this.pO.push(`${row},${col}`);

    this.validateWinner(player);
    if (this.winner) alert(`The winner is ${this.winner}`);
    if (this.turnCount == 9) alert(`Game over`);
  }

  validateWinner(p: PLAYER) {
    let a: string[] = p == 'O' ? this.pO : this.pX;
    // console.log(`${p} turn`);
    this.winnwerCombinations.forEach((comb) => {
      let mathchAll =
        a.includes(comb[0]) && a.includes(comb[1]) && a.includes(comb[2]);

      // console.log({ a, comb, mathchAll });
      if (mathchAll) this.winner = p;
    });
  }

  renderPlayer(row: number, col: number) {
    let cord = `${row},${col}`;
    if (this.pO.includes(cord)) return 'O';
    else if (this.pX.includes(cord)) return 'X';
    else return '';
  }

  reset() {
    this.player = 'O';
    delete this.winner;
    this.pO = [];
    this.pX = [];
    this.turnCount = 0;
  }

  winnwerCombinations: string[][] = [
    ['0,0', '0,1', '0,2'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
    ['0,0', '1,0', '2,0'],
    ['1,0', '1,1', '1,2'],
    ['2,0', '2,1', '2,2'],
    ['0,0', '1,1', '2,2'],
    ['0,2', '1,1', '2,0'],
  ];
}

type PLAYER = 'X' | 'O';
