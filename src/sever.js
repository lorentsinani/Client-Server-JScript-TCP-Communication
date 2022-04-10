const net = require('net');
const fs = require('fs');

//server creation and message from which address and port is connection made
const server = net.createServer((socket) => {
    console.log(
        'Connection from',
        socket.remoteAddress,
        'port',
        socket.remotePort
    );

//beginning of getting data from client
    socket.on('data', (buffer) => {
        console.log(
            'Request from',
            socket.remoteAddress,
            'port',
            socket.remotePort
        );
        // showing input of client at server side as a string
        console.log(buffer.toString().slice(''));
        //converting input to string without spaces and inicialize that on a vriable called message
        let message = buffer.toString().trim();
        //showing at server side the length of data inputed
        console.log("Request string length is: " + message.length);
