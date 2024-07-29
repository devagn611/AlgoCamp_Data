#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

#define BOARD_SIZE 3

typedef struct {
    char board[BOARD_SIZE][BOARD_SIZE];
    char currentPlayer;
} TicTacToe;

void initializeGame(TicTacToe* game) {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            game->board[i][j] = ' ';
        }
    }
    game->currentPlayer = 'X';
}

void printBoard(TicTacToe* game) {
    printf("  1 2 3\n");
    for (int i = 0; i < BOARD_SIZE; i++) {
        printf("%d ", i + 1);
        for (int j = 0; j < BOARD_SIZE; j++) {
            printf("%c", game->board[i][j]);
            if (j < 2) printf("|");
        }
        printf("\n");
        if (i < 2) printf("  -+-+-\n");
    }
}

bool makeMove(TicTacToe* game, int row, int col) {
    if (game->board[row][col] == ' ') {
        game->board[row][col] = game->currentPlayer;
        return true;
    }
    return false;
}

bool checkWin(TicTacToe* game) {
    for (int i = 0; i < BOARD_SIZE; i++) {
        if (game->board[i][0] != ' ' && 
            game->board[i][0] == game->board[i][1] && 
            game->board[i][1] == game->board[i][2]) {
            return true;
        }
        if (game->board[0][i] != ' ' && 
            game->board[0][i] == game->board[1][i] && 
            game->board[1][i] == game->board[2][i]) {
            return true;
        }
    }
    if (game->board[0][0] != ' ' && 
        game->board[0][0] == game->board[1][1] && 
        game->board[1][1] == game->board[2][2]) {
        return true;
    }
    if (game->board[0][2] != ' ' && 
        game->board[0][2] == game->board[1][1] && 
        game->board[1][1] == game->board[2][0]) {
        return true;
    }
    return false;
}

bool isBoardFull(TicTacToe* game) {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (game->board[i][j] == ' ') {
                return false;
            }
        }
    }
    return true;
}

void switchPlayer(TicTacToe* game) {
    game->currentPlayer = (game->currentPlayer == 'X') ? 'O' : 'X';
}

void playTurn(TicTacToe* game) {
    int row, col;

    while (1) {
        printBoard(game);
        printf("Player %c's turn.\n", game->currentPlayer);
        printf("Enter row and column (e.g., 1 2): ");
        
        if (scanf("%d %d", &row, &col) != 2) {
            printf("Invalid input. Please enter two numbers.\n");
            while (getchar() != '\n');  // Clear input buffer
            continue;
        }

        row--;
        col--;

        if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
            if (makeMove(game, row, col)) {
                if (checkWin(game)) {
                    printBoard(game);
                    printf("Player %c wins!\n", game->currentPlayer);
                    return;
                }
                if (isBoardFull(game)) {
                    printBoard(game);
                    printf("It's a tie!\n");
                    return;
                }
                switchPlayer(game);
            } else {
                printf("That space is already occupied. Try again.\n");
            }
        } else {
            printf("Invalid input. Row and column must be between 1 and 3.\n");
        }
    }
}

void play(TicTacToe* game) {
    printf("Welcome to Tic Tac Toe!\n");
    playTurn(game);
}

int main() {
    TicTacToe game;
    initializeGame(&game);
    play(&game);
    return 0;
}