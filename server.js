/**
 * Created by maluramichael on 25/08/16.
 */

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);

app.use(express.static(__dirname + '/public'));

// GENERAL -------------------------------
io.on('connection', ()=> {
    console.log('connected');
});

// CLIENT -------------------------------
io.on('client.upload', ()=> {
    console.log('client.upload');
});

// ADMIN -------------------------------
io.on('admin.setChallenge', ()=> {
    console.log('admin.setChallenge');
});

io.on('admin.addPoints', (user, poinds)=> {
    console.log('admin.addPoints');
});

io.on('admin.clearPoints', ()=> {
    console.log('admin.clearPoints');
});

// ADMIN -------------------------------

server.listen(8080);