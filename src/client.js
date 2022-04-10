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
client.on('data', (data) => { 

console.log(data.toString('utf-8')); 

}); 

 

const rl = readline.createInterface({ 

input: process.stdin 

}); 

rl.on('line', (line) => { 

client.write(${line}\n); 

}); 

rl.on('close', () => { 

client.end(); 

});

 

