// A server for Tic-tac toe games.
//
// The first two client connections become X and O for the first game; the next
// two connections face off in the second game, and so on. Games run concurrently.
//
// The games use TTTP, the "Tic Tac Toe Protocol" which I just made up:
//
// Client -> Server
//     MOVE <n>
//     QUIT
//
// Server -> Client
//     WELCOME <char>
//     VALID_MOVE
//     OTHER_PLAYER_MOVED <n>
//     OTHER_PLAYER_LEFT
//     VICTORY
//     DEFEAT
//     TIE
//     MESSAGE <text>
//
// The cells are numbered top-to-bottom, left-to-right, as 0..8.

const net = require('net');

(() => {
    // When null, we are waiting for the first player to connect, after which we will
    // create a new game. After the second player connects, the game can be fully set
    // up and played, and this variable immediately set back to null so the future
    // connections make new games.
    let game = null;

    net.createServer((socket) => {
        console.log('Connection from', socket.remoteAddress, 'port', socket.remotePort);
        if (game === null) {
            game = new Game();
            game.playerX = new Player(game, socket, 'X');
        } else {
            game.playerO = new Player(game, socket, 'O');
            game = null;
        }
    }).listen(58901, () => {
        console.log('Tic Tac Toe Server is Running');
    });
})();

class Game {
    // A board has nine squares. Each square is either unowned or it is owned by a
    // player. So we use a simple array of player references. If null, the corresponding
    // square is unowned, otherwise the array cell stores a reference to the player that
    // owns it.
    constructor() {
        this.board = Array(9).fill(null);
    }

    hasWinner() {
        const b = this.board;
        const wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        return wins.some(([x, y, z]) => b[x] != null && b[x] === b[y] && b[y] === b[z]);
    }

    boardFilledUp() {
        return this.board.every(square => square !== null);
    }

    move(location, player) {
        if (player !== this.currentPlayer) {
            throw new Error('Not your turn');
        } else if (!player.opponent) {
            throw new Error('You don’t have an opponent yet');
        } else if (this.board[location] !== null) {
            throw new Error('Cell already occupied');
        }
        this.board[location] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer.opponent;
    }
}
