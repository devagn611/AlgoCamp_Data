const readline = require('readline');

class TicTacToe {
    constructor() {
        this.board = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
        this.currentPlayer = 'X';
    }

    printBoard() {
        console.log('  1 2 3');
        for (let i = 0; i < 3; i++) {
            console.log(`${i + 1} ${this.board[i].join('|')}`);
            if (i < 2) console.log('  -+-+-');
        }
    }

    makeMove(row, col) {
        if (this.board[row][col] === ' ') {
            this.board[row][col] = this.currentPlayer;
            return true;
        }
        return false;
    }

    checkWin() {
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] !== ' ' && 
                this.board[i][0] === this.board[i][1] && 
                this.board[i][1] === this.board[i][2]) {
                return true;
            }
            if (this.board[0][i] !== ' ' && 
                this.board[0][i] === this.board[1][i] && 
                this.board[1][i] === this.board[2][i]) {
                return true;
            }
        }
        if (this.board[0][0] !== ' ' && 
            this.board[0][0] === this.board[1][1] && 
            this.board[1][1] === this.board[2][2]) {
            return true;
        }
        if (this.board[0][2] !== ' ' && 
            this.board[0][2] === this.board[1][1] && 
            this.board[1][1] === this.board[2][0]) {
            return true;
        }
        return false;
    }

    isBoardFull() {
        return this.board.every(row => row.every(cell => cell !== ' '));
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    play() {
        console.log("Welcome to Tic Tac Toe!");
        this.playTurn();
    }

    playTurn() {
        this.printBoard();
        console.log(`Player ${this.currentPlayer}'s turn.`);
        
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Enter row and column (e.g., 1 2): ', (answer) => {
            const [row, col] = answer.split(' ').map(num => parseInt(num) - 1);

            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                if (this.makeMove(row, col)) {
                    if (this.checkWin()) {
                        this.printBoard();
                        console.log(`Player ${this.currentPlayer} wins!`);
                        rl.close();
                        return;
                    }

                    if (this.isBoardFull()) {
                        this.printBoard();
                        console.log("It's a tie!");
                        rl.close();
                        return;
                    }

                    this.switchPlayer();
                    rl.close();
                    this.playTurn();
                } else {
                    console.log("That space is already occupied. Try again.");
                    rl.close();
                    this.playTurn();
                }
            } else {
                console.log("Invalid input. Row and column must be between 1 and 3.");
                rl.close();
                this.playTurn();
            }
        });
    }
}


const game = new TicTacToe();
game.play();