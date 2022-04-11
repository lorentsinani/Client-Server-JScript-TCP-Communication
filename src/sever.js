const net = require('net');
const fs = require('fs');
const { exec } = require("child_process");

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

        //making conditionals as a simulation of login form of client side
        if (message == "login" || message == "Login") {
            socket.write("Write username password");
        }
        else if (message == "lorent lorent123") {
            console.log("Granting read, write and execute access to user");
            // giving permission to read at given file
            fs.chmod("example.txt", 0o600, () => {
                socket.write("\nReading the file contents before changes/writes: \n");
                socket.write(fs.readFileSync('example.txt', 'utf-8') + "\n");

                socket.write("\nTrying to write to file\n");
                socket.write("loading...\n");

                //letting client to overwrite on a given file
                fs.writeFileSync('example.txt', "You have changed 'example.txt' file because you have access to!");

                socket.write("\nReading the file contents after changes/writes\n");
                socket.write(fs.readFileSync('example.txt', 'utf-8') + "\n");

                //letting client read files of that directory and show them on server side
                fileObjs = fs.readdirSync(__dirname, { withFileTypes: true });

                console.log("\nCurrent directory files:");
                fileObjs.forEach(file => {
                    console.log(file);
                });

            });
        }

        
        
        else if (message == "lorik lorik123" || message == "loreta loreta123" || message == "etror etror123") {
            console.log("Granting read access to user");
            fs.chmod("example.txt", 0o600, () => {
                socket.write("\nReading 'readonly.txt' file content\n");
                socket.write(fs.readFileSync('readonly.txt', 'utf-8') + "\n");
            });
        }

        //adding some random conditionals of simulated messages
        else if (message == "Hello" || message == "hello") {
            socket.write("Hello client!");
        }
        else if (message == "What is my ip" || message == "what is my ip") {
            socket.write("Your IP Address is: " + socket.remoteAddress);
        }
        else if (message == "What is my port" || message == "what is my port") {
            socket.write("Your port is: " + socket.remotePort);
        }
        else if (message == "execute") {
            socket.write("Which file u want to execute?");
        }
        else if (message == "example.txt") {
            exec("example.txt", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
        else if (message == "readonly.txt") {
            exec("readonly.txt", (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });
        }
        else {
            socket.write(message.toUpperCase());
        }

    });
    //telling that on close tab socket will expire/destroy
    socket.on('end', () => {
        console.log('Closed', socket.remoteAddress, 'port', socket.remotePort);
    });
    });

    server.maxConnections = 20;
    server.listen(58901);
