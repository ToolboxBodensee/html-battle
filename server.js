/**
 * Created by maluramichael on 25/08/16.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', ()=> {
    console.log('connected');
});

server.listen(8080);