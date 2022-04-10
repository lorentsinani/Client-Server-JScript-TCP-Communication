// A client for the capitalization server. After connecting, every line 

// sent to the server will come back capitalized. 

// 

// Use interactively: 

// 

// node capitalizeclient.js 10.0.1.40 

// 

// Or pipe in a file to be capitalized: 

// 

// node capitalizeclient.js 10.0.1.40 < myfile 

 

const net = require('net'); 

const readline = require('readline'); 

 

