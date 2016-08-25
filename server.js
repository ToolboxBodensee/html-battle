/**
 * Created by maluramichael on 25/08/16.
 */
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const socket = require('socket.io');
const io = socket(server);
const _ = require('lodash');

const uuid = require('./lib/uuid');

// MIDDLEWARE -------------------------------
app.use(express.static(__dirname + '/public'));

// DATA -------------------------------
var clients = {};

// GENERAL -------------------------------
io.on('connection', (socket)=> {
    console.log('connected');

    var id = null;
    for (var tries = 5; tries > 0; tries--) {
        id = uuid();
        if (clients[id]) {
            continue;
        }
        clients[id] = {socket, points: 0};
    }

    socket.emit('receive_id', {id});
});

// CLIENT -------------------------------
io.on('client.upload', (id)=> {
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


// RUN -------------------------------
server.listen(8080);