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
